import type { Tool } from '../types/index.js';
import type { UnityClient } from '../unity-client.js';

export function createAssetTools(unityClient: UnityClient): Tool[] {
  return [
    {
      name: 'import_asset',
      description: 'Import an asset file into the Unity project with specified import settings.',
      inputSchema: {
        type: 'object',
        properties: {
          filePath: {
            type: 'string',
            description: 'Path to the file to import (relative to Assets folder or absolute)'
          },
          assetPath: {
            type: 'string',
            description: 'Destination path in Assets folder'
          },
          importSettings: {
            type: 'object',
            description: 'Import settings specific to asset type',
            additionalProperties: true
          },
          overwrite: {
            type: 'boolean',
            description: 'Whether to overwrite existing assets',
            default: false
          }
        },
        required: ['filePath'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('assets.import', args);
        return result;
      }
    },

    {
      name: 'create_material',
      description: 'Create a new material asset with specified properties and shader.',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the material'
          },
          path: {
            type: 'string',
            description: 'Path to save the material (relative to Assets folder)'
          },
          shader: {
            type: 'string',
            description: 'Shader name (e.g., "Standard", "Unlit/Color")',
            default: 'Standard'
          },
          properties: {
            type: 'object',
            description: 'Material properties to set',
            properties: {
              color: {
                type: 'object',
                properties: {
                  r: { type: 'number', minimum: 0, maximum: 1 },
                  g: { type: 'number', minimum: 0, maximum: 1 },
                  b: { type: 'number', minimum: 0, maximum: 1 },
                  a: { type: 'number', minimum: 0, maximum: 1 }
                }
              },
              metallic: { type: 'number', minimum: 0, maximum: 1 },
              smoothness: { type: 'number', minimum: 0, maximum: 1 },
              emission: {
                type: 'object',
                properties: {
                  r: { type: 'number', minimum: 0 },
                  g: { type: 'number', minimum: 0 },
                  b: { type: 'number', minimum: 0 }
                }
              }
            }
          }
        },
        required: ['name'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('assets.createMaterial', args);
        return result;
      }
    },

    {
      name: 'manage_prefabs',
      description: 'Create, update, or manage prefab assets.',
      inputSchema: {
        type: 'object',
        properties: {
          action: {
            type: 'string',
            enum: ['create', 'update', 'instantiate', 'unpack'],
            description: 'Action to perform on the prefab'
          },
          gameObjectName: {
            type: 'string',
            description: 'Name of GameObject to create prefab from (for create action)'
          },
          gameObjectId: {
            type: 'number',
            description: 'Instance ID of GameObject (for create action)'
          },
          prefabPath: {
            type: 'string',
            description: 'Path to the prefab asset'
          },
          savePath: {
            type: 'string',
            description: 'Path to save new prefab (for create action)'
          },
          position: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' }
            },
            description: 'Position for instantiated prefab'
          }
        },
        required: ['action'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('assets.managePrefab', args);
        return result;
      }
    },

    {
      name: 'organize_assets',
      description: 'Organize assets by creating folders, moving files, or cleaning up the project.',
      inputSchema: {
        type: 'object',
        properties: {
          action: {
            type: 'string',
            enum: ['createFolder', 'moveAsset', 'deleteAsset', 'renameAsset'],
            description: 'Organization action to perform'
          },
          sourcePath: {
            type: 'string',
            description: 'Source path for move/rename operations'
          },
          targetPath: {
            type: 'string',
            description: 'Target path for move/rename/create operations'
          },
          recursive: {
            type: 'boolean',
            description: 'Whether to apply operation recursively',
            default: false
          }
        },
        required: ['action', 'targetPath'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('assets.organize', args);
        return result;
      }
    },

    {
      name: 'search_assets',
      description: 'Search for assets in the project based on various criteria.',
      inputSchema: {
        type: 'object',
        properties: {
          filter: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Search by asset name' },
              type: { type: 'string', description: 'Filter by asset type (e.g., "Texture2D", "AudioClip")' },
              label: { type: 'string', description: 'Filter by asset label' },
              path: { type: 'string', description: 'Search in specific path' },
              extension: { type: 'string', description: 'Filter by file extension' }
            },
            description: 'Search criteria'
          },
          includePackages: {
            type: 'boolean',
            description: 'Whether to include package assets in search',
            default: false
          },
          maxResults: {
            type: 'number',
            description: 'Maximum number of results to return',
            default: 100
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('assets.search', args);
        return result;
      }
    },

    {
      name: 'create_texture',
      description: 'Create a procedural texture asset with specified properties.',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the texture'
          },
          width: {
            type: 'number',
            description: 'Width of the texture in pixels',
            default: 256
          },
          height: {
            type: 'number',
            description: 'Height of the texture in pixels',
            default: 256
          },
          format: {
            type: 'string',
            enum: ['RGBA32', 'RGB24', 'ARGB32', 'R8', 'RG16'],
            description: 'Texture format',
            default: 'RGBA32'
          },
          pattern: {
            type: 'string',
            enum: ['solid', 'checkerboard', 'gradient', 'noise'],
            description: 'Pattern to generate',
            default: 'solid'
          },
          color: {
            type: 'object',
            properties: {
              r: { type: 'number', minimum: 0, maximum: 1 },
              g: { type: 'number', minimum: 0, maximum: 1 },
              b: { type: 'number', minimum: 0, maximum: 1 },
              a: { type: 'number', minimum: 0, maximum: 1 }
            },
            description: 'Base color for the texture'
          },
          savePath: {
            type: 'string',
            description: 'Path to save the texture (relative to Assets folder)'
          }
        },
        required: ['name'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('assets.createTexture', args);
        return result;
      }
    },

    {
      name: 'package_manager',
      description: 'Manage Unity packages - install, update, or remove packages.',
      inputSchema: {
        type: 'object',
        properties: {
          action: {
            type: 'string',
            enum: ['install', 'remove', 'update', 'list'],
            description: 'Package management action'
          },
          packageName: {
            type: 'string',
            description: 'Name or identifier of the package'
          },
          version: {
            type: 'string',
            description: 'Specific version to install (optional)'
          },
          source: {
            type: 'string',
            enum: ['registry', 'git', 'local', 'embedded'],
            description: 'Package source type',
            default: 'registry'
          },
          url: {
            type: 'string',
            description: 'URL for git or custom packages'
          }
        },
        required: ['action'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('assets.packageManager', args);
        return result;
      }
    },

    {
      name: 'get_asset_info',
      description: 'Get detailed information about a specific asset.',
      inputSchema: {
        type: 'object',
        properties: {
          assetPath: {
            type: 'string',
            description: 'Path to the asset (relative to Assets folder)'
          },
          guid: {
            type: 'string',
            description: 'GUID of the asset'
          },
          includeMetadata: {
            type: 'boolean',
            description: 'Whether to include asset metadata',
            default: true
          },
          includeDependencies: {
            type: 'boolean',
            description: 'Whether to include asset dependencies',
            default: false
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('assets.getInfo', args);
        return result;
      }
    }
  ];
} 