# PROJECT_A Role Access

A simple module that uses the Drupal core node grant system to restrict view
access to nodes to users with a specific role.

This module also defines a field_role_access field base for use on content
types like Pages and News.

By default, the list of user roles is filtered to only include the 'member'
role. To add other roles to the allowed values list, override the
`project_a_role_access.settings` `whitelist` setting by defining an array of role
machine names.

For example, you could place something like the following in `settings.php`.

```
$config['project_a_role_access.settings']['whitelist'] = [
  'member',
  'special_editor',
  'super_member',
];
```
