export default {
  openapi: '3.0.0',
  info: {
    title: 'PSN RWANDA ltd API',
    version: '1.0.0',
    description: 'API for PSN RWANDA ltd web services',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development server',
    },
  ],
  tags: [
    { name: 'Users', description: 'User operations' },
    { name: 'Products', description: 'Product operations' },
    { name: 'Categories', description: 'Category operations' },
    { name: 'Messages', description: 'Message operations' },
  ],
  paths: {
    '/products/products': {
      get: {
        tags: ['Products'],
        summary: 'Get all products',
        description: 'Retrieve all products with their categories',
        responses: {
          '200': {
            description: 'List of products',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            }
          },
          '500': { description: 'Server error' }
        }
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new product',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductInput'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Product created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          '400': { 
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Invalid category or At least one image is required'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/products/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'Product ID'
        }
      ],
      get: {
        tags: ['Products'],
        summary: 'Get a product by ID',
        responses: {
          '200': {
            description: 'Product found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          '404': { description: 'Product not found' },
          '500': { description: 'Server error' }
        }
      },
      put: {
        tags: ['Products'],
        summary: 'Update a product',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductInput'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Product updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          '400': { description: 'Bad request' },
          '404': { description: 'Product not found' }
        }
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete a product',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Product deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Product deleted successfully'
                    }
                  }
                }
              }
            }
          },
          '404': { description: 'Product not found' },
          '500': { description: 'Server error' }
        }
      }
    },
    '/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get all categories',
        responses: {
          '200': {
            description: 'List of categories',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Category'
                  }
                }
              }
            }
          },
          '500': { description: 'Server error' }
        }
      },
      post: {
        tags: ['Categories'],
        summary: 'Create a new category',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CategoryInput'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Category created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          '400': { description: 'Bad request' }
        }
      }
    },
    '/categories/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'Category ID'
        }
      ],
      get: {
        tags: ['Categories'],
        summary: 'Get a category by ID',
        responses: {
          '200': {
            description: 'Category found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          '404': { description: 'Category not found' },
          '500': { description: 'Server error' }
        }
      },
      put: {
        tags: ['Categories'],
        summary: 'Update a category',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CategoryInput'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Category updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          '400': { description: 'Bad request' },
          '404': { description: 'Category not found' }
        }
      },
      delete: {
        tags: ['Categories'],
        summary: 'Delete a category',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Category deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Category deleted successfully'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Cannot delete category: it is being used by products'
                    }
                  }
                }
              }
            }
          },
          '404': { description: 'Category not found' },
          '500': { description: 'Server error' }
        }
      }
    },
  },
  components: {
    schemas: {
      ProductInput: {
        type: 'object',
        required: ['productName', 'images', 'categoryId', 'description'],
        properties: {
          productName: {
            type: 'string',
            description: 'Name of the product'
          },
          images: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Array of image URLs',
            minItems: 1
          },
          categoryId: {
            type: 'string',
            description: 'ID of the category this product belongs to'
          },
          description: {
            type: 'string',
            description: 'Detailed description of the product'
          }
        }
      },
      Product: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Product ID'
          },
          productName: {
            type: 'string',
            description: 'Name of the product'
          },
          images: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Array of image URLs'
          },
          category: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'Category ID'
              },
              name: {
                type: 'string',
                description: 'Category name'
              }
            }
          },
          description: {
            type: 'string',
            description: 'Detailed description of the product'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp of product creation'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp of last update'
          }
        }
      },
      CategoryInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            description: 'Name of the category'
          },
          description: {
            type: 'string',
            description: 'Description of the category'
          },
          image: {
            type: 'string',
            description: 'URL of the category image'
          }
        }
      },
      Category: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Category ID'
          },
          name: {
            type: 'string',
            description: 'Name of the category'
          },
          description: {
            type: 'string',
            description: 'Description of the category'
          },
          image: {
            type: 'string',
            description: 'URL of the category image'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp of category creation'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp of last update'
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};