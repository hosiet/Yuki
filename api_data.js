define({ "api": [
  {
    "type": "post",
    "url": "/auth",
    "title": "Log in to remote registry",
    "name": "Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token of the User</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/auth",
    "title": "Request info of User",
    "name": "Whoami",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>Whether User is admin</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/config",
    "title": "Export config of Repos",
    "name": "ExportConfig",
    "group": "Config",
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Config",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/config",
    "title": "Import config",
    "name": "ImportConfig",
    "group": "Config",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Config",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/reload",
    "title": "Reload config",
    "name": "ReloadConfig",
    "group": "Config",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Config",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/containers/:repo/logs",
    "title": "Fetch logs of container",
    "name": "GetLogsOfContainer",
    "group": "Containers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repo",
            "description": "<p>Name of the Repository</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "follow",
            "description": "<p>Follow log output</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tail",
            "defaultValue": "all",
            "description": "<p>Number of lines to show from the end of the logs</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Stream",
            "optional": false,
            "field": "log",
            "description": "<p>Log Stream</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Containers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/containers/:repo/inspect",
    "title": "Inspect container",
    "name": "InspectContainer",
    "group": "Containers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repo",
            "description": "<p>Name of the Repository</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Containers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/containers/:repo",
    "title": "Delete container",
    "name": "ListContainers",
    "group": "Containers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repo",
            "description": "<p>Name of the Repository</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "empty",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Containers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/containers",
    "title": "List containers",
    "name": "ListContainers",
    "group": "Containers",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "containers",
            "description": "<p>(virtual field) List of containers</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Containers",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/containers/:repo/wait",
    "title": "Await container stop",
    "name": "WaitForContainer",
    "group": "Containers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repo",
            "description": "<p>Name of the Repository</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "StatusCode",
            "description": "<p>Exit code</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Containers",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/repositories/:name",
    "title": "Create Repository",
    "name": "CreateRepository",
    "group": "Repositories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Repository</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "interval",
            "description": "<p>Task interval</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Name of the Docker image</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "storageDir",
            "description": "<p>Path to storage directory</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "autoRotLog",
            "defaultValue": "true",
            "description": "<p>Whether rotates log automatically (Optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rotateCycle",
            "defaultValue": "10",
            "description": "<p>Number of the cycle versions to save (Optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "args",
            "description": "<p>Arguments passed to image (Optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "envs",
            "description": "<p>Environment variables (Optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "volumes",
            "description": "<p>Volumes to be mount (Optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bindIp",
            "description": "<p>Local ip to be bound (Optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Owner of the storage directory (Optional)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Repositories",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/repositories/:name",
    "title": "Delete Repository",
    "name": "DeleteRepository",
    "group": "Repositories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Repository</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "String",
            "optional": false,
            "field": "empty",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Repositories",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/repositories/:name/sync",
    "title": "Got Logs of Repository",
    "name": "FetchRepositoryLogs",
    "group": "Repositories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Repository</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "n",
            "description": "<p>Nth log-file</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "stats",
            "description": "<p>Only return matched log-files' names</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Stream",
            "optional": false,
            "field": "logs",
            "description": "<p>Log stream</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "names",
            "description": "<p>Names of the log-files</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Repositories",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/repositories/:name",
    "title": "Get Repository",
    "name": "GetRepository",
    "group": "Repositories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Repository</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "interval",
            "description": "<p>Task interval</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Name of the Docker image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "storageDir",
            "description": "<p>Path to storage directory</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "autoRotLog",
            "description": "<p>Whether rotates log automatically</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rotateCycle",
            "description": "<p>Number of the cycle versions to save</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "args",
            "description": "<p>Arguments passed to image</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "envs",
            "description": "<p>Environment variables</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "volumes",
            "description": "<p>Volumes to be mount</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bindIp",
            "description": "<p>Local ip to be bound</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Owner of the storage directory</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Repositories",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/repositories",
    "title": "List repositories",
    "name": "ListRepositories",
    "group": "Repositories",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "repos",
            "description": "<p>(virtual field) List of repositories</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".interval",
            "description": "<p>Task interval</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".image",
            "description": "<p>Name of the Docker image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".storageDir",
            "description": "<p>Path to storage directory</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": ".autoRotLog",
            "description": "<p>Whether rotates log automatically</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": ".rotateCycle",
            "description": "<p>Number of the cycle versions to save</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": ".args",
            "description": "<p>Arguments passed to image</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": ".envs",
            "description": "<p>Environment variables</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": ".volumes",
            "description": "<p>Volumes to be mount</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".bindIp",
            "description": "<p>Local ip to be bound</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".user",
            "description": "<p>Owner of the storage directory</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Repositories",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/repositories/:name/sync",
    "title": "Sync Repository",
    "name": "SyncRepository",
    "group": "Repositories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Repository</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "debug",
            "description": "<p>Start the container in debug mode</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "String",
            "optional": false,
            "field": "empty",
            "description": ""
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Stream",
            "optional": false,
            "field": "logs",
            "description": "<p>Log stream</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Repositories",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/repositories/:name",
    "title": "Update Repository",
    "name": "UpdateRepository",
    "group": "Repositories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Repository</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "interval",
            "description": "<p>Task interval</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Name of the Docker image</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "storageDir",
            "description": "<p>Path to storage directory</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "autoRotLog",
            "defaultValue": "true",
            "description": "<p>Whether rotates log automatically</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rotateCycle",
            "defaultValue": "10",
            "description": "<p>Number of the cycle versions to save</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "args",
            "description": "<p>Arguments passed to image</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "envs",
            "description": "<p>Environment variables</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "volumes",
            "description": "<p>Volumes to be mount</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bindIp",
            "description": "<p>Local ip to be bound</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Owner of the storage directory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "String",
            "optional": false,
            "field": "empty",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Repositories",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/users/:name",
    "title": "Create User",
    "name": "CreateUser",
    "group": "Users",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/users/:name",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "Users",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/:name",
    "title": "Get User",
    "name": "GetUser",
    "group": "Users",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users",
    "title": "List Users",
    "name": "ListUsers",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/users/:name",
    "title": "Update User",
    "name": "UpdateUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-mirror-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "version": "0.1.0",
    "type": "",
    "url": "",
    "filename": "src/routes/index.js",
    "group": "_home_knight_Project_ustcmirror_yuki_src_routes_index_js",
    "groupTitle": "_home_knight_Project_ustcmirror_yuki_src_routes_index_js",
    "name": ""
  }
] });