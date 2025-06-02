import type { Tool } from '../types/index.js';
import type { UnityClient } from '../unity-client.js';

export function createBuildTools(unityClient: UnityClient): Tool[] {
  return [
    {
      name: 'configure_build',
      description: 'Configure build settings for different platforms including scenes, player settings, and build options.',
      inputSchema: {
        type: 'object',
        properties: {
          target: {
            type: 'string',
            enum: ['StandaloneWindows64', 'StandaloneOSX', 'StandaloneLinux64', 'iOS', 'Android', 'WebGL', 'WSAPlayer'],
            description: 'Target platform for the build'
          },
          scenes: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of scene paths to include in build'
          },
          buildPath: {
            type: 'string',
            description: 'Output path for the build'
          },
          developmentBuild: {
            type: 'boolean',
            description: 'Whether to create a development build',
            default: false
          },
          scriptDebugging: {
            type: 'boolean',
            description: 'Enable script debugging',
            default: false
          },
          connectProfiler: {
            type: 'boolean',
            description: 'Connect to profiler',
            default: false
          },
          allowDebugging: {
            type: 'boolean',
            description: 'Allow debugging',
            default: false
          },
          buildOptions: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['None', 'Development', 'AutoRunPlayer', 'ShowBuiltPlayer', 'BuildAdditionalStreamedScenes', 'AcceptExternalModificationsToPlayer', 'ConnectWithProfiler', 'AllowDebugging', 'SymlinkLibraries', 'UncompressedAssetBundle', 'ConnectToHost', 'CustomConnectionID', 'EnableHeadlessMode']
            },
            description: 'Additional build options'
          },
          playerSettings: {
            type: 'object',
            description: 'Player settings to configure',
            properties: {
              companyName: { type: 'string' },
              productName: { type: 'string' },
              version: { type: 'string' },
              bundleVersion: { type: 'string' },
              bundleIdentifier: { type: 'string' },
              icon: { type: 'string', description: 'Path to app icon' },
              splashScreen: { type: 'string', description: 'Path to splash screen' }
            }
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('build.configure', args);
        return result;
      }
    },

    {
      name: 'execute_build',
      description: 'Execute a build for the specified platform with current settings.',
      inputSchema: {
        type: 'object',
        properties: {
          target: {
            type: 'string',
            enum: ['StandaloneWindows64', 'StandaloneOSX', 'StandaloneLinux64', 'iOS', 'Android', 'WebGL', 'WSAPlayer'],
            description: 'Target platform for the build'
          },
          buildPath: {
            type: 'string',
            description: 'Output path for the build'
          },
          async: {
            type: 'boolean',
            description: 'Whether to run the build asynchronously',
            default: true
          },
          reportProgress: {
            type: 'boolean',
            description: 'Whether to report build progress',
            default: true
          },
          cleanBuild: {
            type: 'boolean',
            description: 'Whether to clean before building',
            default: false
          }
        },
        required: ['target', 'buildPath'],
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('build.execute', args);
        return result;
      }
    },

    {
      name: 'run_tests',
      description: 'Execute Unity Test Runner for EditMode and PlayMode tests.',
      inputSchema: {
        type: 'object',
        properties: {
          mode: {
            type: 'string',
            enum: ['EditMode', 'PlayMode', 'Both'],
            description: 'Test mode to run',
            default: 'Both'
          },
          filter: {
            type: 'object',
            properties: {
              testNames: {
                type: 'array',
                items: { type: 'string' },
                description: 'Specific test names to run'
              },
              categories: {
                type: 'array',
                items: { type: 'string' },
                description: 'Test categories to include'
              },
              assemblies: {
                type: 'array',
                items: { type: 'string' },
                description: 'Test assemblies to run'
              }
            },
            description: 'Filters for test execution'
          },
          buildTarget: {
            type: 'string',
            description: 'Target platform for PlayMode tests'
          },
          timeout: {
            type: 'number',
            description: 'Timeout for test execution in seconds',
            default: 300
          },
          generateReport: {
            type: 'boolean',
            description: 'Whether to generate a test report',
            default: true
          },
          reportPath: {
            type: 'string',
            description: 'Path to save the test report'
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('build.runTests', args);
        return result;
      }
    },

    {
      name: 'get_build_report',
      description: 'Get detailed information about the last build including size, warnings, and errors.',
      inputSchema: {
        type: 'object',
        properties: {
          includeAssets: {
            type: 'boolean',
            description: 'Whether to include asset information in the report',
            default: true
          },
          includeSteps: {
            type: 'boolean',
            description: 'Whether to include build step information',
            default: true
          },
          includeFiles: {
            type: 'boolean',
            description: 'Whether to include file list',
            default: false
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('build.getReport', args);
        return result;
      }
    },

    {
      name: 'clean_build',
      description: 'Clean build artifacts and temporary files.',
      inputSchema: {
        type: 'object',
        properties: {
          cleanType: {
            type: 'string',
            enum: ['all', 'library', 'temp', 'builds', 'logs'],
            description: 'Type of cleanup to perform',
            default: 'all'
          },
          confirmClean: {
            type: 'boolean',
            description: 'Confirmation that user wants to clean (safety check)',
            default: false
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('build.clean', args);
        return result;
      }
    },

    {
      name: 'build_addressables',
      description: 'Build Addressable assets for the project.',
      inputSchema: {
        type: 'object',
        properties: {
          buildTarget: {
            type: 'string',
            description: 'Target platform for Addressables build'
          },
          buildPath: {
            type: 'string',
            description: 'Path for Addressables build output'
          },
          clearCache: {
            type: 'boolean',
            description: 'Whether to clear the cache before building',
            default: false
          },
          buildPlayerContent: {
            type: 'boolean',
            description: 'Whether to build player content',
            default: true
          },
          buildRemoteContent: {
            type: 'boolean',
            description: 'Whether to build remote content',
            default: true
          },
          profile: {
            type: 'string',
            description: 'Addressables profile to use for the build'
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('build.addressables', args);
        return result;
      }
    },

    {
      name: 'optimize_build',
      description: 'Analyze and optimize build settings for size and performance.',
      inputSchema: {
        type: 'object',
        properties: {
          target: {
            type: 'string',
            description: 'Target platform to optimize for'
          },
          optimizationType: {
            type: 'string',
            enum: ['size', 'performance', 'balanced'],
            description: 'Type of optimization to prioritize',
            default: 'balanced'
          },
          analyzeAssets: {
            type: 'boolean',
            description: 'Whether to analyze asset usage and sizes',
            default: true
          },
          suggestChanges: {
            type: 'boolean',
            description: 'Whether to suggest optimization changes',
            default: true
          },
          applyChanges: {
            type: 'boolean',
            description: 'Whether to automatically apply safe optimizations',
            default: false
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('build.optimize', args);
        return result;
      }
    },

    {
      name: 'get_console_logs',
      description: 'Retrieve console logs from Unity Editor including errors, warnings, and debug messages.',
      inputSchema: {
        type: 'object',
        properties: {
          logTypes: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['Log', 'Warning', 'Error', 'Assert', 'Exception']
            },
            description: 'Types of logs to retrieve',
            default: ['Log', 'Warning', 'Error']
          },
          limit: {
            type: 'number',
            description: 'Maximum number of log entries to return',
            default: 100
          },
          since: {
            type: 'string',
            description: 'ISO timestamp to get logs since (optional)'
          },
          clearAfterRetrieve: {
            type: 'boolean',
            description: 'Whether to clear logs after retrieving them',
            default: false
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('build.getConsoleLogs', args);
        return result;
      }
    },

    {
      name: 'profile_build',
      description: 'Profile build performance and identify bottlenecks.',
      inputSchema: {
        type: 'object',
        properties: {
          target: {
            type: 'string',
            description: 'Target platform to profile'
          },
          profileSteps: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['preprocessing', 'compilation', 'assetprocessing', 'linking', 'postprocessing']
            },
            description: 'Build steps to profile',
            default: ['compilation', 'assetprocessing']
          },
          generateReport: {
            type: 'boolean',
            description: 'Whether to generate a detailed profiling report',
            default: true
          },
          reportPath: {
            type: 'string',
            description: 'Path to save the profiling report'
          }
        },
        additionalProperties: false
      },
      async execute(args: Record<string, unknown>) {
        const result = await unityClient.sendRequest('build.profile', args);
        return result;
      }
    }
  ];
} 