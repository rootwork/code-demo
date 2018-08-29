# SMART School Import Module
Module for custom migrations for importing school data. As it stands, this README pertains to our initial import at project init in April 2017.

## Data Source
Data source: https://nces.ed.gov/ccd/pubschuniv.asp

For initial import in April 2017, we're importing "2015-16 (Preliminary directory)".


## Data Notes
We're justing importing some basic data:

- NCESSCH - unique school id
- SCH_NAME - school name
- LSTREET1,2,3,CITY,STATE,ZIP - school location address
- UPDATED_STATUS - school status based on following these key/values:

```
1 = Open (School was operational at the time of the last report and is currently operational)
2 = Closed (School has closed since the time of the last report)
3 = New (School has been opened since the time of the last report)
4 = Added (School was in existence, but not reported in a previous year's CCD school universe survey, and is now being added)
5 = Changed Agency (School was listed in previous year's CCD school universe as being affiliated with a different education agency)
6 = Inactive (School is temporarily closed and may reopen within three years)
7 = Future (School is scheduled to be operational within two years)
8 = Reopened (School was closed on a previous year's file but has reopened)
```

In `csv` are a few files:

- `raw.xlsx` is raw data, with unneeded fields removed (They offer a "Flat file" `.dat` exteion which I manually changed to `.csv` and imported to Excel)
- `test.csv` has a very small selection of data for testing
- `data.csv` is the raw data, with the following fixes applied:
   - some rows have text fields in all caps, fixed with Excel's `=proper`
   - Excel exports csvs with CR instead of LF, which `migrate_source_csv` doesn't like. `LC_ALL=C tr '\r' '\n' < broken.csv > fixed.csv` works for me.
   - the data has ascii chars we need to remove. I used this: `perl -i.bk -pe 's/[^[:ascii:]]//g;' data.csv` From: http://stackoverflow.com/a/13884472/216761
   - Excel adds spaces after the ids, fixed in vim with `%s/\s,/,/g`
   - the raw data abbreviates "school" to "sch" in some places. I used this in vim: `%s/\<sch\>/School/gi`. I did the same substitution for "elem"/"Elementary".

### Zip Code issue
At the _very first_ step in this process (opening the raw data in Excel) leading zeroes were stripped from the zip codes.

The error perists through all of these files, but the data imports sucessfully.

Instead of re-doing the data processing outline above, and re-running the migration, the following sql fix was applied:

#### base table, 4 digit zip codes
drush sqlq "UPDATE node__field_school_address SET field_school_address_postal_code = CONCAT('0', field_school_address_postal_code) WHERE length(field_school_address_postal_code)=4"

#### base table, 3 digit zip codes
drush sqlq "UPDATE node__field_school_address SET field_school_address_postal_code = CONCAT('00', field_school_address_postal_code) WHERE length(field_school_address_postal_code)=3"

#### revision table, 4 digit zip codes
drush sqlq "UPDATE node_revision__field_school_address SET field_school_address_postal_code = CONCAT('0', field_school_address_postal_code) WHERE length(field_school_address_postal_code)=4"

#### revision table, 3 digit zip codes
drush sqlq "UPDATE node_revision__field_school_address SET field_school_address_postal_code = CONCAT('00', field_school_address_postal_code) WHERE length(field_school_address_postal_code)=3"

## Migration/Import
### Resources
- https://www.jeffgeerling.com/blog/2016/migrating-20000-images-audio-clips-and-video-clips-drupal-8
- https://www.mtech-llc.com/blog/lucas-hedding/migrating-using-csv
- https://github.com/heddn/d8_custom_migrate
- http://www.thoughtspot.com/blog/5-magic-fixes-most-common-csv-file-problems

### Development
The main mapping/config file in `config/install` only gets loaded on module install.

I've not had luck with this proposed solution: https://drupal.stackexchange.com/a/200756

My work around has been to disable/re-enable the module when I make changes to the config.

### Running the migration

#### Using Drush

Helpful Drush commands:

- `migrate-status` - Lists migrations and their status.
- `migrate-import` - Performs import operations.
- `migrate-rollback` - Performs rollback operations.
- `migrate-stop` - Cleanly stops a running operation.
- `migrate-reset-status` - Sets a migration status to idle if it's gotten stuck.
- `migrate-messages` - Lists any messages associated with a migration import.

**Command to run the migration:**

`drush migrate-import migrate_csv`

You can run `drush migrate-status` to see how far along it is, or visit `http://smart.dev/admin/structure/migrate/manage/default/migrations` to see it in the UI.

#### Dealing with errors/hangs

On fatal errors I seem to have to run this to reset the migration:

`drush php-eval 'var_dump(Drupal::keyValue("migrate_status")->set('migrate_csv', 0))'`

See: http://eworldproblems.mbaynton.com/2015/09/reset-a-crashed-migration-in-drupal-8/

I had to increase php's memory from .5GB to 1.5GB to see reasonable speed on the migration.

### Testing
A few queries to test imported data.

#### 102,126 total schools
The following should all return 102,126:

`drush sqlq "select count(nid) from node where type='school'"`
`drush sqlq "select count(entity_id) from node__field_school_address where field_school_address_postal_code IS NOT NULL"`
`drush sqlq "select count(entity_id) from node__field_school_address where field_school_address_locality IS NOT NULL"`

#### school_status
Compare results to the charts in the `Testing` sheet of `csv/raw.xlsx`.

`drush sqlq "select count(entity_id), field_school_status_value from node__field_school_status GROUP BY field_school_status_value"`

#### school_address_state
Compare results to the charts in the `Testing` sheet of `csv/raw.xlsx`.

`drush sqlq "select count(entity_id), field_school_address_administrative_area from node__field_school_address GROUP BY field_school_address_administrative_area"`
