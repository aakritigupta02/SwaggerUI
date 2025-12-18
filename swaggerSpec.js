const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Sample Patient API',
    version: '1.0.0',
    description: 'API for managing patients (sample project)'
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local server' }
  ],
  components: {
    schemas: {
      Patient: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'b1a7f6c2-3d4e-4f1a-8b2c-9d0e1f2a3b4c' },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          age: { type: 'integer', example: 45 },
          gender: { type: 'string', example: 'male' },
          createdAt: { type: 'string', format: 'date-time', example: '2025-12-17T12:00:00Z' }
        },
        required: ['firstName','lastName']
      },
      NewPatient: {
        type: 'object',
        properties: {
          firstName: { type: 'string', example: 'Jane' },
          lastName: { type: 'string', example: 'Smith' },
          age: { type: 'integer', example: 30 },
          gender: { type: 'string', example: 'female' }
        },
        required: ['firstName','lastName']
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'An internal server error occurred.' }
        }
      }
    },
    parameters: {
      PatientId: {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        description: 'UUID of the patient'
      }
    }
  },
  paths: {
    '/api/v1/patients': {
      get: {
        tags: ['Patients'],
        summary: 'Get all patients',
        responses: {
          '200': {
            description: 'List of patients',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Patient' } },
                examples: {
                  success: {
                    summary: 'Successful response',
                    value: [
                      { id: '1', firstName: 'Alice', lastName: 'Brown', age: 28, gender: 'female' }
                    ]
                  }
                }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      },
      post: {
        tags: ['Patients'],
        summary: 'Create a new patient',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NewPatient' },
              examples: {
                create: {
                  summary: 'New patient payload',
                  value: { firstName: 'Carlos', lastName: 'Lopez', age: 40, gender: 'male' }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Patient created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Patient' },
                examples: {
                  success: {
                    summary: 'Created patient',
                    value: { id: '2', firstName: 'Carlos', lastName: 'Lopez', age: 40, gender: 'male' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad request (validation error)',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: { badRequest: { value: { error: 'firstName is required' } } }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      }
    },
    '/api/v1/patients/{id}': {
      get: {
        tags: ['Patients'],
        summary: 'Get patient by ID',
        parameters: [{ $ref: '#/components/parameters/PatientId' }],
        responses: {
          '200': {
            description: 'Patient found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' }, examples: { success: { value: { id: '1', firstName: 'Alice', lastName: 'Brown', age: 28 } } } } }
          },
          '404': {
            description: 'Patient not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' }, examples: { notFound: { value: { error: 'No patient found with the provided ID.' } } } } }
          },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      },
      put: {
        tags: ['Patients'],
        summary: 'Update patient by ID',
        parameters: [{ $ref: '#/components/parameters/PatientId' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/NewPatient' }, examples: { update: { value: { firstName: 'Updated', lastName: 'Name', age: 50 } } } } }
        },
        responses: {
          '200': {
            description: 'Updated patient',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' }, examples: { success: { value: { id: '1', firstName: 'Updated', lastName: 'Name', age: 50 } } } } }
          },
          '400': { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      },
      delete: {
        tags: ['Patients'],
        summary: 'Delete patient by ID',
        parameters: [{ $ref: '#/components/parameters/PatientId' }],
        responses: {
          '204': { description: 'Patient deleted (no content)' },
          '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      }
    }
  }
};

export default swaggerSpec;
