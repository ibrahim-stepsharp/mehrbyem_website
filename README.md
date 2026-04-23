# Mehrbyem Web - Medusa v2 Project

This project consists of a Medusa v2 backend and a Next.js storefront.

---

## 0. Prerequisites: Node.js Version

To avoid compatibility warnings (like `EBADENGINE`), it is recommended to use **Node.js v22.22.0 or later**.

If you use `nvm` (Node Version Manager), you can install and switch to the correct version by running:

```bash
# Install the recommended version
nvm install 22.22.0

# Switch to the version
nvm use 22.22.0
```

*Note: Verify your version with `node -v`.*

---

## 1. Installation

If you encounter network timeout errors during `npm install` on the backend, use an increased timeout:

```bash
cd mehrbyem_web
npm install --fetch-timeout=300000
```

---

## 2. Database Setup (PostgreSQL with Docker)

To run a PostgreSQL database locally using Docker on a custom port (e.g., **5433** to avoid conflicts with local Postgres), run the following command:

```bash
docker run --name medusa-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=medusa-db -p 5433:5432 -d postgres
```

### Backend Configuration
Update your `.env` file in the `mehrbyem_web` directory with the matching port:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5433/medusa-db
```
```

---

## 3. Backend Setup

Once your database is running and your `.env` is configured, you need to initialize the database schema.

### Initialize Database Schema (Migrations)
To create the database structure without adding any test data, run:

```bash
cd mehrbyem_web
npx medusa db:migrate
```

*Note: In Medusa v2, running `npm run dev` (which executes `medusa develop`) will also automatically run migrations if your database is empty.*

### Seed Data (Optional)
If you want to pre-fill the database with demo products and configurations, run:

```bash
npm run seed
```
*(Skip this if you want a completely empty store)*

### Create Admin Credentials
After migrations are finished, create your admin user to access the dashboard:

```bash
npx medusa user --email admin@me.com --password supersecret
```

---

## 4. Storefront Setup (Environment Variables)

The storefront requires a publishable API key to communicate with the Medusa backend.
### Create a Publishable Key

In Medusa v2, you create publishable keys through the **Medusa Admin Dashboard**:

1. Log in to your Admin Dashboard (usually at `http://localhost:9000/app`).
2. Navigate to **Settings** → **API Key Management**.
3. Click **Create API Key**.
4. Enter a **Title** (e.g., "Web Storefront").
5. Select the **Sales Channels** this key should have access to.
6. Click **Save**.
7. Copy the generated key (starting with `pk_...`).

### Configure Storefront .env
...

Create a `.env` file in the `mehrbyem_web-storefront` directory and add the key you just created:

```env
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_... # Paste your key here
MEDUSA_BACKEND_URL=http://localhost:9000
```

---

## 5. Running the Project

### Start the Backend
```bash
cd mehrbyem_web
npm run dev
```

### Start the Storefront
```bash
cd mehrbyem_web-storefront
npm install
npm run dev
```

The storefront will be available at `http://localhost:8000`.
