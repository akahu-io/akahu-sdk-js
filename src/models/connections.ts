export type ConnectionType = "classic" | "official";

export type ConnectionMigrationMode =
  | "strict"
  | "migration"
  | "side_by_side"
  | "developer";

/**
 * Akahu connection metadata returned by /connections endpoints.
 */
export type Connection = {
  /**
   * The connected financial institution's unique identifier.
   * This will always be prefixed with `conn_`.
   */
  _id: string;

  /**
   * The id of the corresponding classic connection for this institution.
   *
   * This is only present for official open banking connections (Read more [here](https://developers.akahu.nz/docs/official-open-banking)).
   */
  _classic?: string;

  /**
   * Display name for the connected institution.
   */
  name: string;

  /**
   * A URL pointing to an image of the institution's logo.
   */
  logo: string;

  /**
   * The type of integration used to connect to this institution.
   *
   * This will be one of:
   * - `classic` → A classic Akahu connection, which uses Akahu's custom
   * built integration to connect to the institution.
   * - `official` → An official open banking connection, which uses the
   * institution's official open banking APIs.
   */
  connection_type: ConnectionType;

  /**
   * Whether new connections to this institution are allowed.
   *
   * This may be false if the institution is migrating to an official open banking connection.
   */
  new_connections_enabled: boolean;

  /**
   * The migration mode of this connection.
   *
   * This is only present for official open banking connections (Read more [here](https://developers.akahu.nz/docs/official-open-banking)).
   *
   * The `mode` will be one of:
   * - `strict` → Only official open banking connections will be enabled. Any pre-existing classic connections that were not migrated will be removed.
   * - `migration` → Existing classic connections will continue to function, but users will be unable to set up a new classic connection if there is an equivalent official open banking connection available. New connections can only be established using the official open banking integration.
   * - `side_by_side` → Your users will be able to choose when setting up a new connection whether they wish to use a classic or official open banking integration.
   * - `developer` → This is like migration mode, but will allow developers to continue to connect classic connections, so that they can test the migration process.
   */
  mode?: ConnectionMigrationMode;

  /**
   * The deadline date for users to migrate from classic to official open banking connections.
   *
   * This is only present for official open banking connections (Read more [here](https://developers.akahu.nz/docs/official-open-banking)).
   *
   * @example "2025-12-31"
   */
  deadline?: string;
};

/**
 * Akahu connection metadata returned when attached to other resources.
 */
export type ConnectionInfo = {
  /**
   * The connected financial institution's unique identifier.
   * This will always be prefixed with `conn_`.
   */
  _id: string;

  /**
   * Display name for the connected institution.
   */
  name: string;

  /**
   * A URL pointing to an image of the institution's logo.
   */
  logo: string;
};
