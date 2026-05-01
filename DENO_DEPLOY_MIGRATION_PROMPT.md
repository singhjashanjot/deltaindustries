  # Deno Deploy Migration Prompt

  ## Context
  You are tasked with migrating an existing Node.js/Express server to Deno Deploy. The project is called "Delta Recognition Hub" and is a full-stack digital brand platform for Delta Industries, replacing their IndiaMART dependency.

  ## Current Tech Stack
  - **Runtime**: Node.js
  - **Server Framework**: Express.js v5.2.1
  - **Database ORM**: Prisma v6.6.0
  - **API Layer**: tRPC v11.1.0
  - **Language**: TypeScript
  - **Entry Point**: `server/index.ts`

  ## Goal
  Migrate the server to run on Deno Deploy while maintaining all existing functionality.

  ## Required Changes

  ### 1. Create deno.json Configuration
  Create a `deno.json` file in the project root with the following configuration:

  ```json
  {
    "nodeModulesDir": "auto",
    "compilerOptions": {
      "lib": ["deno.window"],
      "types": ["node"]
    },
    "imports": {
      "@prisma/adapter-pg": "npm:@prisma/adapter-pg@^7.0.0",
      "@prisma/client": "npm:@prisma/client@^7.0.0",
      "prisma": "npm:prisma@^7.0.0",
      "express": "npm:express@^5.2.1",
      "cors": "npm:cors@^2.8.6",
      "cookie-parser": "npm:cookie-parser@^1.4.7",
      "@trpc/server": "npm:@trpc/server@^11.1.0",
      "@trpc/server/adapters/express": "npm:@trpc/server/adapters/express@^11.1.0"
    },
    "tasks": {
      "dev": "deno run -A --env=.env --watch server/index.ts",
      "server": "deno run -A --env=.env server/index.ts",
      "db:generate": "deno run -A --env=.env npm:prisma generate",
      "db:migrate": "deno run -A --env=.env npm:prisma migrate dev",
      "db:push": "deno run -A --env=.env npm:prisma db push",
      "db:seed": "deno run -A --env=.env prisma/seed.ts"
    }
  }
  ```

  ### 2. Update Prisma Configuration
  In `prisma/schema.prisma`, update the generator block to use Deno runtime:

  ```prisma
  generator client {
    provider = "prisma-client-js"
    previewFeatures = ["deno"]
    runtime = "deno"
  }
  ```

  Also update the datasource if using PostgreSQL to use the Deno adapter:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```

  ### 3. Update Prisma Client Version
  Update `package.json` to use Prisma v7.0.0 or later for full Deno support:
  - Change `@prisma/client` from `^6.6.0` to `^7.0.0`
  - Change `prisma` from `^6.6.0` to `^7.0.0`

  ### 4. Update Server Entry Point Imports
  In `server/index.ts`, update imports to use npm specifiers or ensure they work with Deno's npm compatibility. The current imports should work with Deno 2.0's npm compatibility, but verify all imports are compatible.

  ### 5. Install Dependencies with Deno
  Run the following commands:
  ```bash
  deno install
  deno install --allow-scripts
  ```

  ### 6. Regenerate Prisma Client
  ```bash
  deno run -A --env=.env npm:prisma generate
  ```

  ### 7. Update Package.json Scripts
  Update the dev:server script to use Deno:
  ```json
  "dev:server": "deno run -A --env=.env --watch server/index.ts"
  ```

  ### 8. Test Locally
  Test the server locally with Deno:
  ```bash
  deno task dev
  ```

  ### 9. Deployment to Deno Deploy
  Create a deployment script or document the deployment process for Deno Deploy:
  - Ensure all environment variables are set in Deno Deploy dashboard
  - Verify the database connection string is compatible
  - Test the health endpoint at `/health`

  ### 10. Alternative: Deploy to Vercel (Recommended for Node.js)
  If Deno Deploy proves challenging, deploy to Vercel instead using Vercel CLI:

  #### Install Vercel CLI
  ```bash
  npm install -g vercel
  ```

  #### Login to Vercel
  ```bash
  vercel login
  ```

  #### Deploy Project
  ```bash
  vercel
  ```
  Follow the prompts to configure the project.

  #### Add Environment Variables Using Vercel CLI
  Add all required environment variables from `.env` file:
  ```bash
  vercel env add DATABASE_URL
  vercel env add MEILISEARCH_HOST
  vercel env add MEILISEARCH_API_KEY
  vercel env add ADMIN_SECRET
  # Add any other environment variables needed
  ```

  For production environment:
  ```bash
  vercel env add DATABASE_URL production
  vercel env add MEILISEARCH_HOST production
  vercel env add MEILISEARCH_API_KEY production
  vercel env add ADMIN_SECRET production
  ```

  #### Deploy to Production
  ```bash
  vercel --prod
  ```

  #### Verify Deployment
  After deployment, Vercel will provide a URL. Test the deployment with:
  ```bash
  curl https://your-project-url.vercel.app/health
  ```

  ### 11. Test with Postman
  After deployment, thoroughly test the API using Postman:

  #### Import Postman Collections
  The project has Postman collections in the `postman/` directory:
  - `admin-auth.json` - Admin authentication endpoints
  - `admin-categories.json` - Category management endpoints
  - `admin-enquiries.json` - Enquiry management endpoints
  - `admin-products.json` - Product management endpoints

  #### Update Base URL
  In Postman, update the base URL variable to point to your deployed environment:
  - For Vercel: `https://your-project-url.vercel.app`
  - For Deno Deploy: `https://your-project-url.deno.dev`

  #### Test Endpoints
  Test the following critical endpoints:

  **Health Check:**
  ```
  GET /health
  ```

  **Admin Authentication:**
  ```
  POST /trpc/admin.login
  POST /trpc/admin.verify
  ```

  **Categories:**
  ```
  GET /trpc/category.getAll
  POST /trpc/category.create
  PUT /trpc/category.update
  DELETE /trpc/category.delete
  ```

  **Products:**
  ```
  GET /trpc.product.getAll
  POST /trpc.product.create
  PUT /trpc.product.update
  DELETE /trpc.product.delete
  ```

  **Enquiries:**
  ```
  GET /trpc/enquiry.getAll
  POST /trpc/enquiry.create
  PUT /trpc/enquiry.update
  DELETE /trpc/enquiry.delete
  ```

  #### Verify Postman Tests
  Ensure all Postman tests pass:
  - Status codes are correct (200, 201, 400, 401, etc.)
  - Response body structure matches expected schema
  - Authentication/authorization works correctly
  - CORS headers are present
  - Database operations succeed
  - Search functionality works (Meilisearch integration)

  ## Important Notes

  1. **Deno 2.0 Required**: Ensure you're using Deno 2.0 or later for full npm compatibility
  2. **Node Modules Directory**: The `"nodeModulesDir": "auto"` setting is crucial for Prisma to work correctly
  3. **File System Access**: Deno Deploy has limited file system access - ensure the application doesn't rely on local file operations that won't work in the edge environment
  4. **Middleware Compatibility**: Verify that all Express middleware (cors, cookie-parser) works correctly with Deno
  5. **tRPC Compatibility**: Ensure tRPC's Express adapter works with Deno - you may need to use tRPC's Deno adapter instead

  ## Alternative Approach
  If the Express/tRPC stack proves difficult to migrate to Deno, consider:
  - Using Deno-native frameworks like Oak or Fresh
  - Using tRPC's Deno adapter instead of the Express adapter
  - This would require more extensive refactoring but might be more stable in the long run

  ## Testing Checklist
  - [ ] Server starts without errors using `deno task dev`
  - [ ] Health endpoint returns correct response
  - [ ] Database connection works
  - [ ] tRPC endpoints are accessible
  - [ ] CORS configuration works
  - [ ] Cookie parsing works
  - [ ] All existing API routes function correctly
  - [ ] Vercel deployment succeeds
  - [ ] Environment variables configured in Vercel
  - [ ] Postman collections imported and updated with deployment URL
  - [ ] All Postman tests pass

  ## Files to Modify
  1. Create: `deno.json`
  2. Modify: `prisma/schema.prisma`
  3. Modify: `package.json` (update Prisma versions and scripts)
  4. Verify: `server/index.ts` (imports compatibility)
  5. Verify: `server/trpc.ts` (tRPC context creation)
  6. Verify: All router files in `server/routers/`

  ## Success Criteria
  - Server runs on Deno locally
  - All existing functionality is preserved
  - Application can be deployed to Deno Deploy
  - No breaking changes to the API contracts
