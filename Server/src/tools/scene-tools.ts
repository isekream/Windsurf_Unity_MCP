import type { Tool } from '../types/index.js';
import type { UnityClient } from '../unity-client.js';

export function createSceneTools(unityClient: UnityClient): Tool[] {
  return [
    {
      name: 'create_gameobject',
      description: 'Create a new GameObject in the current scene with specified properties and components.',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the GameObject'
          },
          parent: {
            type: 'string',
            description: 'Name or instance ID of parent GameObject'
          },
          position: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' }
            },
            description: 'World position of the GameObject'
          },
          rotation: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' }
            },
            description: 'Euler rotation of the GameObject'
          },
          scale: {
            type: 'object',
            properties: {
              x: { type: 'number', default: 1 },
              y: { type: 'number', default: 1 },
              z: { type: 'number', default: 1 }
            },
            description: 'Scale of the GameObject'
          },
          components: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of component types to add'
          },
          tag: {
            type: 'string',
            description: 'Tag to assign to the GameObject'
          },
          layer: {
            type: 'number',
            description: 'Layer to assign to the GameObject'
          }
        },
        required: ['name'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('scene.createGameObject', args);
        return result;
      }
    },

    {
      name: 'modify_component',
      description: 'Add, remove, or update components on a GameObject.',
      inputSchema: {
        type: 'object',
        properties: {
          gameObjectName: {
            type: 'string',
            description: 'Name of the target GameObject'
          },
          gameObjectId: {
            type: 'number',
            description: 'Instance ID of the target GameObject'
          },
          action: {
            type: 'string',
            enum: ['add', 'remove', 'update'],
            description: 'Action to perform on the component'
          },
          componentType: {
            type: 'string',
            description: 'Type of component (e.g., "Rigidbody", "MeshRenderer")'
          },
          properties: {
            type: 'object',
            description: 'Component properties to set (for add/update actions)',
            additionalProperties: true
          }
        },
        required: ['action', 'componentType'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('scene.modifyComponent', args);
        return result;
      }
    },

    {
      name: 'query_scene',
      description: 'Get information about the current scene including hierarchy and GameObject details.',
      inputSchema: {
        type: 'object',
        properties: {
          includeInactive: {
            type: 'boolean',
            description: 'Whether to include inactive GameObjects',
            default: false
          },
          includeComponents: {
            type: 'boolean',
            description: 'Whether to include component information',
            default: true
          },
          filter: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Filter by GameObject name' },
              tag: { type: 'string', description: 'Filter by tag' },
              layer: { type: 'number', description: 'Filter by layer' },
              componentType: { type: 'string', description: 'Filter by component type' }
            },
            description: 'Filters to apply when querying'
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('scene.query', args);
        return result;
      }
    },

    {
      name: 'select_objects',
      description: 'Select GameObjects in the Unity Editor hierarchy.',
      inputSchema: {
        type: 'object',
        properties: {
          gameObjects: {
            type: 'array',
            items: {
              oneOf: [
                { type: 'string', description: 'GameObject name' },
                { type: 'number', description: 'GameObject instance ID' }
              ]
            },
            description: 'List of GameObjects to select'
          },
          addToSelection: {
            type: 'boolean',
            description: 'Whether to add to existing selection or replace it',
            default: false
          }
        },
        required: ['gameObjects'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('scene.selectObjects', args);
        return result;
      }
    },

    {
      name: 'delete_gameobject',
      description: 'Delete a GameObject from the scene.',
      inputSchema: {
        type: 'object',
        properties: {
          gameObjectName: {
            type: 'string',
            description: 'Name of the GameObject to delete'
          },
          gameObjectId: {
            type: 'number',
            description: 'Instance ID of the GameObject to delete'
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('scene.deleteGameObject', args);
        return result;
      }
    },

    {
      name: 'move_gameobject',
      description: 'Move a GameObject to a new position, rotation, or scale.',
      inputSchema: {
        type: 'object',
        properties: {
          gameObjectName: {
            type: 'string',
            description: 'Name of the GameObject to move'
          },
          gameObjectId: {
            type: 'number',
            description: 'Instance ID of the GameObject to move'
          },
          position: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' }
            },
            description: 'New world position'
          },
          rotation: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' }
            },
            description: 'New Euler rotation'
          },
          scale: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
              z: { type: 'number' }
            },
            description: 'New scale'
          },
          relative: {
            type: 'boolean',
            description: 'Whether the values are relative to current transform',
            default: false
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('scene.moveGameObject', args);
        return result;
      }
    },

    {
      name: 'save_scene',
      description: 'Save the current scene to disk.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path to save the scene (relative to Assets folder)'
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('scene.save', args);
        return result;
      }
    },

    {
      name: 'load_scene',
      description: 'Load a scene in the Unity Editor.',
      inputSchema: {
        type: 'object',
        properties: {
          scenePath: {
            type: 'string',
            description: 'Path to the scene file'
          },
          additive: {
            type: 'boolean',
            description: 'Whether to load additively or replace current scene',
            default: false
          }
        },
        required: ['scenePath'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('scene.load', args);
        return result;
      }
    }
  ];
} 