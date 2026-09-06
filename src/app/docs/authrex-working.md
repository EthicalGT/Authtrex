# AUTHREX

## Identity, Authentication & Authorization Infrastructure

**Document Type:** Product + Business + Functional + Technical Working Specification
**Architecture:** Feature-Based Modular Monolith
**Backend:** NestJS
**Frontend:** Next.js
**Database:** PostgreSQL
**ORM:** Prisma
**Primary Protocol:** OAuth 2.0 / OpenID Connect
**Product Model:** Authentication-as-a-Service / Identity Platform

---

# 1. What is AUTHREX?

AUTHREX is an **identity and authentication infrastructure platform** that allows external applications and websites to delegate user authentication to AUTHREX.

The core idea is:

> **Developers should not have to build authentication infrastructure from scratch. AUTHREX provides the identity layer for them.**

Instead of every application implementing:

* user registration
* login
* password hashing
* session management
* JWT handling
* OAuth
* authorization
* consent
* MFA
* account security
* authentication auditing

independently, an application can integrate with AUTHREX and use AUTHREX as its identity provider.

---

# 2. Business Scenario

Imagine a developer builds:

**Example Application:** `TaskFlow`

TaskFlow needs users to log in.

Normally TaskFlow would need to build:

```text
TaskFlow
   │
   ├── Registration
   ├── Login
   ├── Password hashing
   ├── Sessions
   ├── JWT
   ├── Forgot password
   ├── Email verification
   ├── MFA
   ├── Account security
   └── User management
```

This creates a large security responsibility for TaskFlow.

With AUTHREX:

```text
                 ┌─────────────────────┐
                 │       AUTHREX       │
                 │                     │
                 │ Identity Provider   │
                 │ Authentication      │
                 │ Authorization       │
                 │ User Identity        │
                 │ Security            │
                 └──────────┬──────────┘
                            │
                            │ OAuth / OIDC
                            │
                    ┌───────▼────────┐
                    │    TaskFlow    │
                    │   Application  │
                    └────────────────┘
```

TaskFlow integrates with AUTHREX.

The application no longer needs to own the complete authentication system.

---

# 3. The Core Product Concept

AUTHREX has three major actors.

## 3.1 AUTHREX

AUTHREX is the **Identity Provider (IdP)**.

It owns:

* AUTHREX user identities
* authentication
* credentials
* authentication sessions
* authorization
* OAuth clients
* consent
* tokens
* security policies
* authentication events

---

## 3.2 Application Developer

A developer creates an application and registers it with AUTHREX.

Example:

```text
Application:
TaskFlow

Client ID:
authrex_client_123

Redirect URI:
https://taskflow.com/auth/callback

Allowed scopes:
openid
profile
email
```

AUTHREX gives the application the information required to integrate.

---

## 3.3 End User

The end user owns an AUTHREX account.

For example:

```text
Ganesh
ganesh@example.com
```

The user can use the same AUTHREX identity across applications that support AUTHREX.

---

# 4. The Most Important Business Relationship

The fundamental relationship is:

```text
AUTHREX User
      │
      │ authenticates with
      ▼
   AUTHREX
      │
      │ provides identity
      ▼
External Application
```

AUTHREX authenticates the user.

The external application receives proof of the authenticated identity.

---

# 5. Example Real-World Flow

Suppose Ganesh wants to use TaskFlow.

TaskFlow displays:

```text
┌──────────────────────────────┐
│          TaskFlow            │
│                              │
│  Email                       │
│  [______________________]    │
│                              │
│  Password                    │
│  [______________________]    │
│                              │
│       [ Login ]              │
│                              │
│  ───────── OR ─────────      │
│                              │
│  [ Login with AUTHREX ]      │
│                              │
└──────────────────────────────┘
```

Ganesh clicks:

**Login with AUTHREX**

TaskFlow requests authentication from AUTHREX.

AUTHREX verifies Ganesh.

After successful authentication, AUTHREX returns an authorization result to TaskFlow.

TaskFlow then establishes its own application session.

Conceptually:

```text
User
 │
 │ clicks Login with AUTHREX
 ▼
TaskFlow
 │
 │ authentication request
 ▼
AUTHREX
 │
 │ authenticate user
 ▼
AUTHREX Identity
 │
 │ authorization result
 ▼
TaskFlow
 │
 │ creates application session
 ▼
Authenticated User
```

---

# 6. AUTHREX Is Not Just a Login Button

The `Login with AUTHREX` button is only the **integration experience**.

The actual AUTHREX platform consists of multiple systems.

```text
AUTHREX
│
├── Identity Management
├── Authentication
├── Session Management
├── Application Management
├── OAuth 2.0
├── OpenID Connect
├── Authorization
├── Consent Management
├── Scope Management
├── Token Management
├── Security
├── Audit Logging
├── Notifications
├── Developer Platform
└── AUTHREX SDK
```

---

# 7. Product Architecture

The platform should be thought of as two major sides.

```text
                    AUTHREX
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   Developer Platform        Identity Platform
          │                         │
          │                         │
   Application Management     User Management
   OAuth Clients              Authentication
   Redirect URIs              Sessions
   API Credentials            Credentials
   Scopes                     MFA
   SDK                        Security
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
                 OAuth / OIDC
```

---

# 8. Developer Platform

Developers need a dashboard where they can create and manage applications.

Example:

```text
Developer Dashboard

Applications
├── TaskFlow
├── ShopSphere
└── CineVibe
```

For each application:

```text
Application
├── Client ID
├── Client Secret (confidential clients)
├── Application Type
├── Redirect URIs
├── Allowed Origins
├── Scopes
├── OAuth configuration
├── Branding
├── Security settings
└── Audit information
```

---

# 9. Application Registration

Before an external application can use AUTHREX, it must register.

Example:

```text
Application Name:
TaskFlow

Application Type:
Web Application

Redirect URI:
https://taskflow.com/auth/callback

Allowed Scopes:
openid
profile
email
```

AUTHREX creates a client identity.

Example:

```text
Client ID:
arx_01JABC123...
```

For confidential applications, AUTHREX may also issue a client secret.

The client secret must never be exposed in frontend code.

---

# 10. Application Types

AUTHREX should conceptually support different application types.

### Confidential Client

Examples:

* server-rendered web applications
* backend applications
* server-to-server applications

These can securely store client credentials.

### Public Client

Examples:

* SPA
* mobile application
* desktop application

These cannot safely keep a client secret.

For public clients, AUTHREX should use **PKCE**.

---

# 11. Redirect URI Security

Redirect URIs are extremely important.

AUTHREX must not blindly redirect users to arbitrary URLs.

Example registered URI:

```text
https://taskflow.com/auth/callback
```

If the request contains:

```text
https://attacker.com/callback
```

AUTHREX must reject it.

Conceptually:

```text
Requested redirect URI
          │
          ▼
Compare with registered URIs
          │
     ┌────┴────┐
     │         │
   Match    No Match
     │         │
     ▼         ▼
 Allow       Reject
```

This is a critical OAuth security boundary.

---

# 12. Authentication

Authentication answers:

> "Who is this user?"

AUTHREX will eventually support authentication mechanisms such as:

### Password Authentication

```text
Email
Password
```

AUTHREX stores only a secure password hash.

Never:

```text
password = "mypassword"
```

Instead:

```text
password
   │
   ▼
secure password hashing
   │
   ▼
password_hash
```

---

# 13. User Registration

A user can create an AUTHREX account.

Example:

```text
Full Name
Email
Password
```

AUTHREX:

```text
Request
   │
   ▼
Validate input
   │
   ▼
Check email uniqueness
   │
   ▼
Hash password
   │
   ▼
Create user
   │
   ▼
Send verification
```

The initial database currently only needs the core `users` table.

Additional authentication tables should be introduced when their corresponding features are implemented.

---

# 14. Email Verification

After registration:

```text
User
 │
 ▼
Registration
 │
 ▼
AUTHREX creates account
 │
 ▼
Verification email
 │
 ▼
User clicks verification link
 │
 ▼
AUTHREX verifies email
 │
 ▼
isEmailVerified = true
```

Unverified accounts can be subject to appropriate restrictions depending on the security policy.

---

# 15. Login

Basic login:

```text
User
 │
 │ email + password
 ▼
AUTHREX
 │
 ├── Validate input
 ├── Find user
 ├── Check account status
 ├── Verify password
 ├── Apply security policies
 └── Authenticate
       │
       ▼
   Authenticated
```

AUTHREX then creates the appropriate authenticated session/token flow.

---

# 16. Account Status

Users can have states such as:

```text
ACTIVE
SUSPENDED
LOCKED
```

Example:

```text
ACTIVE
   │
   ├── login allowed
   │
   ▼
SUSPENDED
   │
   └── login denied

LOCKED
   │
   └── login denied
```

This allows AUTHREX to enforce account-level security policies.

---

# 17. Authentication vs Authorization

These must remain separate concepts.

### Authentication

> Who are you?

Example:

```text
Ganesh
```

### Authorization

> What are you allowed to do?

Example:

```text
Ganesh can:
- read profile
- access email
```

But perhaps:

```text
Ganesh cannot:
- manage application
- modify developer settings
```

---

# 18. OAuth 2.0

OAuth provides delegated authorization.

AUTHREX will eventually expose OAuth endpoints such as:

```text
/api/v1/oauth/authorize
/api/v1/oauth/token
```

The exact endpoint design can evolve with the implementation.

The conceptual flow is:

```text
Application
     │
     │ Authorization Request
     ▼
 AUTHREX
     │
     │ authenticate user
     │ obtain consent
     ▼
Authorization Code
     │
     ▼
Application
     │
     │ exchange code
     ▼
AUTHREX Token Endpoint
     │
     ▼
Tokens
```

---

# 19. Authorization Code Flow

Example:

```text
TaskFlow
   │
   │ authorization request
   ▼
AUTHREX
   │
   ├── Validate client
   ├── Validate redirect URI
   ├── Authenticate user
   ├── Validate requested scopes
   └── Obtain consent
           │
           ▼
    Authorization Code
           │
           ▼
        TaskFlow
           │
           │ code exchange
           ▼
       AUTHREX
           │
           ▼
         Tokens
```

The authorization code is short-lived and should be single-use.

---

# 20. PKCE

PKCE is required for appropriate public-client flows.

Conceptually:

```text
Client
 │
 ├── Generate code_verifier
 │
 ├── Generate code_challenge
 │
 ▼
AUTHREX
```

AUTHREX stores the challenge associated with the authorization transaction.

Later:

```text
Client
 │
 │ authorization code
 │ + code_verifier
 ▼
AUTHREX
 │
 ├── verify code
 ├── verify PKCE
 └── issue tokens
```

This protects the authorization code exchange against interception.

---

# 21. OpenID Connect

OAuth alone answers:

> "Can this application access something?"

OpenID Connect adds:

> "Who authenticated?"

AUTHREX will eventually support OIDC.

Conceptually:

```text
OAuth 2.0
   +
Identity information
   +
ID Token
   +
UserInfo
   =
OpenID Connect
```

---

# 22. ID Token

The ID token represents the authentication event and identity information intended for the client.

Conceptual information can include:

```text
sub
iss
aud
exp
iat
email
name
```

The exact claims and signing configuration must follow the OIDC specification.

---

# 23. UserInfo

An application may request user information through the appropriate OIDC mechanism.

For example:

```json
{
  "sub": "user-id",
  "name": "Ganesh",
  "email": "ganesh@example.com"
}
```

Only information permitted by the requested scopes should be exposed.

---

# 24. Scopes

Scopes control what an application is asking permission to access.

Example:

```text
openid
profile
email
```

Meaning:

```text
openid
→ OIDC authentication

profile
→ profile information

email
→ email information
```

Future AUTHREX-specific scopes may be introduced when there is a concrete requirement.

---

# 25. Consent

AUTHREX should provide a consent experience where appropriate.

Example:

```text
TaskFlow wants to access:

✓ Your basic profile
✓ Your email address

        [Allow]     [Deny]
```

The user decides whether the application gets the requested permissions.

---

# 26. Consent Lifecycle

Conceptually:

```text
Application requests scopes
          │
          ▼
AUTHREX validates scopes
          │
          ▼
Check previous consent
          │
     ┌────┴────┐
     │         │
 Existing    New
 consent    consent
     │         │
     │         ▼
     │      Show consent
     │         │
     └────┬────┘
          ▼
 Authorization
```

The system should avoid unnecessarily asking the user for consent repeatedly when an existing valid consent record applies.

---

# 27. Tokens

AUTHREX will eventually issue tokens as part of OAuth/OIDC flows.

Potential token categories include:

```text
Access Token
Refresh Token
ID Token
```

Each has a different purpose.

### Access Token

Used to access protected resources.

### Refresh Token

Used to obtain new access tokens where the flow permits it.

### ID Token

Used by OIDC clients to represent authentication/identity.

These must not be treated as interchangeable.

---

# 28. Refresh Tokens

Refresh tokens are high-value credentials.

AUTHREX should not store raw refresh tokens unnecessarily.

A safer model is:

```text
Refresh Token
      │
      ▼
Secure hash
      │
      ▼
Database
```

When a token is presented:

```text
Presented token
      │
      ▼
Hash
      │
      ▼
Compare stored hash
```

AUTHREX can later support token rotation and revocation.

---

# 29. Sessions

A session represents an authenticated interaction.

Eventually AUTHREX should support:

```text
User
 │
 ├── Session A — Chrome
 ├── Session B — Mobile
 └── Session C — Firefox
```

Users should eventually be able to view and revoke sessions.

Example:

```text
Active Sessions

Chrome - Pune
Last active: 2 minutes ago

Android
Last active: 1 hour ago

[Revoke]
```

---

# 30. Logout

Logout should be designed at multiple levels.

### AUTHREX session logout

Terminates the AUTHREX authentication session.

### Application logout

The client application removes its own local session.

### Token revocation

Relevant tokens can be revoked according to the supported flow.

The exact responsibilities must remain clearly separated.

---

# 31. Login with AUTHREX SDK

One of AUTHREX's important developer-facing features is an SDK.

Example:

```html
<script src="AUTHREX-SDK"></script>
```

A developer should be able to configure something conceptually similar to:

```html
<div class="authrex-login"></div>
```

The SDK can automatically render:

```text
┌────────────────────────────┐
│   Login with AUTHREX       │
└────────────────────────────┘
```

The SDK should hide unnecessary implementation complexity from the developer.

---

# 32. SDK Responsibility

The SDK should be responsible for things such as:

```text
Developer Integration
        │
        ▼
AUTHREX SDK
        │
        ├── Render login button
        ├── Start authentication
        ├── Manage popup/redirect interaction
        ├── Handle callback communication
        ├── Validate expected responses
        └── Notify application
```

The SDK must not contain confidential secrets.

Anything shipped to a browser must be considered public.

---

# 33. AUTHREX Popup Experience

AUTHREX may provide a popup-based experience where appropriate.

Conceptually:

```text
                 TaskFlow
                    │
                    │ click
                    ▼
          ┌──────────────────┐
          │ Login with       │
          │ AUTHREX          │
          └────────┬─────────┘
                   │
                   ▼
             AUTHREX Popup
          ┌──────────────────┐
          │ Choose account   │
          │                  │
          │ Ganesh           │
          │ another account  │
          └──────────────────┘
                   │
                   ▼
              Authenticate
                   │
                   ▼
              Authorization
                   │
                   ▼
              TaskFlow
```

This is intended to create an experience similar to modern identity providers while keeping the protocol and security model standards-based.

---

# 34. Account Chooser

AUTHREX can eventually maintain an AUTHREX browser session.

If the user is already authenticated with AUTHREX:

```text
Login with AUTHREX
        │
        ▼
AUTHREX recognizes session
        │
        ▼
Account chooser
        │
        ├── Ganesh
        └── Other account
```

The user can select the account they want to use.

The application itself should not receive the user's AUTHREX session credentials.

---

# 35. Important Security Boundary

An external application should never receive:

```text
AUTHREX password
AUTHREX session cookie
AUTHREX private credential
```

Instead:

```text
AUTHREX
   │
   │ proves authenticated identity
   ▼
Application
```

The application receives only what the protocol allows.

---

# 36. Developer Dashboard

AUTHREX should provide a dashboard for application developers.

Possible sections:

```text
Dashboard
│
├── Overview
├── Applications
├── Users / Identity
├── OAuth
├── Scopes
├── Branding
├── Security
├── Audit Logs
├── API / SDK
└── Documentation
```

---

# 37. Application Dashboard

Example:

```text
TaskFlow

Application ID
Client ID

Status
Active

Application Type
Web

Redirect URIs
2

Allowed Scopes
3

Authentication Requests
12,492

Successful Logins
11,843

Failed Logins
649
```

The exact analytics can be implemented later.

---

# 38. Branding

AUTHREX should allow applications to customize their authentication experience within controlled boundaries.

Possible settings:

```text
Application Name
Logo
Primary branding
Login page appearance
Consent page information
```

However, branding must never compromise security indicators or mislead users about who is authenticating them.

---

# 39. Security Features

Security is a core part of AUTHREX.

Eventually AUTHREX should provide:

```text
Password security
Account lockout
Rate limiting
Session management
Token security
PKCE
Redirect URI validation
CSRF protection
Secure cookies
MFA
Audit logs
Suspicious activity detection
Credential protection
```

---

# 40. MFA

MFA is a future security capability.

Potential mechanisms may include:

```text
Authenticator application
Email OTP
Recovery codes
WebAuthn / security keys
```

Biometric recognition such as facial recognition or fingerprint recognition is **not part of the AUTHREX product requirement**.

---

# 41. Rate Limiting

Authentication endpoints are especially sensitive.

For example:

```text
POST /api/v1/auth/login
```

should not allow unlimited attempts.

Conceptually:

```text
Request
  │
  ▼
Rate limiter
  │
  ├── Allowed → continue
  │
  └── Limit exceeded → reject
```

Rate limits should eventually be configurable according to endpoint and security requirements.

---

# 42. Account Protection

AUTHREX should protect against:

* brute-force login attempts
* credential stuffing
* excessive authentication requests
* token abuse
* invalid OAuth clients
* invalid redirect URIs
* authorization-code replay
* session abuse

Security controls should be implemented deliberately rather than as scattered checks throughout controllers.

---

# 43. Audit Logging

AUTHREX should eventually maintain security-relevant audit events.

Examples:

```text
USER_REGISTERED
USER_LOGIN_SUCCESS
USER_LOGIN_FAILED
EMAIL_VERIFIED
PASSWORD_CHANGED
SESSION_CREATED
SESSION_REVOKED
OAUTH_AUTHORIZATION_STARTED
OAUTH_AUTHORIZATION_APPROVED
OAUTH_AUTHORIZATION_DENIED
TOKEN_ISSUED
TOKEN_REVOKED
APPLICATION_CREATED
APPLICATION_UPDATED
```

Audit records should contain useful metadata without storing sensitive secrets.

Never log:

```text
password
password hash
JWT secret
client secret
refresh token
authorization header
```

---

# 44. Notifications

AUTHREX may eventually send notifications for security events.

Examples:

```text
New login
Password changed
New session
Suspicious activity
Email verification
Password reset
MFA changes
```

This belongs to the notification infrastructure rather than the core authentication business logic.

---

# 45. Password Reset

Future flow:

```text
Forgot Password
       │
       ▼
Enter email
       │
       ▼
AUTHREX
       │
       ▼
Generate reset mechanism
       │
       ▼
Email
       │
       ▼
User verifies request
       │
       ▼
Set new password
```

Reset tokens must be short-lived, single-use, securely generated, and stored safely.

---

# 46. Core Backend Architecture

AUTHREX should use a:

> **Feature-Based Modular Monolith with Clean Architecture principles where appropriate.**

The current structure is conceptually:

```text
src/
│
├── common/
│   ├── config/
│   ├── constants/
│   ├── enums/
│   ├── decorators/
│   ├── exceptions/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   ├── responses/
│   ├── utils/
│   └── validation/
│
├── security/
│   ├── guards/
│   ├── strategies/
│   ├── jwt/
│   ├── decorators/
│   └── services/
│
├── infrastructure/
│   ├── database/
│   ├── email/
│   ├── cache/
│   ├── storage/
│   └── webhooks/
│
├── modules/
│   ├── auth/
│   ├── user/
│   ├── session/
│   ├── application/
│   ├── oauth/
│   ├── consent/
│   ├── scope/
│   ├── audit/
│   └── notification/
│
├── app.module.ts
└── main.ts
```

Not every future module needs to physically exist from day one.

---

# 47. Module Responsibilities

## Auth Module

Responsible for authentication use cases.

Examples:

```text
Registration
Login
Logout
Password authentication
JWT/token-related authentication
Credential verification
```

It orchestrates authentication.

It should not own the User database model.

---

# 48. User Module

Responsible for user identity and user data.

Examples:

```text
Find user
Create user
Update profile
Check account status
Email verification state
User lifecycle
```

Conceptually:

```text
Auth
 │
 │ needs user information
 ▼
User
```

The User module should not depend on Auth.

Avoid:

```text
Auth → User → Auth
```

because that creates circular architecture.

---

# 49. Session Module

Responsible for:

```text
Sessions
Session lifecycle
Session revocation
Refresh-token lifecycle
Device/session information
```

This should be introduced when session functionality is implemented.

---

# 50. Application Module

Responsible for external applications.

Example:

```text
Create application
Update application
Disable application
Retrieve client information
Manage redirect URIs
Manage application configuration
```

---

# 51. OAuth Module

Responsible for protocol implementation.

Examples:

```text
Authorization endpoint
Token endpoint
Authorization codes
PKCE
Client validation
OAuth errors
Token issuance orchestration
```

OAuth should not become mixed into generic user functionality.

---

# 52. Consent Module

Responsible for:

```text
Consent records
Consent decisions
Consent revocation
Consent history
```

---

# 53. Scope Module

Responsible for:

```text
Scope definitions
Scope validation
Application-scope relationships
Requested scope validation
```

---

# 54. Audit Module

Responsible for:

```text
Security events
Authentication events
Application events
Audit persistence
Audit querying
```

---

# 55. Notification Module

Responsible for:

```text
Email
Security notifications
Verification messages
Password reset messages
Future notification channels
```

---

# 56. Database Architecture

AUTHREX uses:

```text
PostgreSQL
     │
     ▼
Prisma
     │
     ▼
NestJS
```

Prisma is the ORM/database access layer.

There should be no TypeORM entities.

---

# 57. Current Database Strategy

Do not create every future table immediately.

Initial phase should focus on:

```text
users
```

with the necessary user status enum.

Future tables are introduced when their feature is actually implemented.

This keeps migrations intentional and avoids speculative database design.

---

# 58. Initial User Model

Conceptually:

```text
users
├── id
├── full_name
├── email
├── password_hash
├── is_email_verified
├── status
├── last_login_at
├── created_at
└── updated_at
```

Important constraints:

```text
id → UUID
email → UNIQUE
password_hash → never plaintext
status → controlled enum
timestamps → UTC
```

---

# 59. API Architecture

AUTHREX APIs should be versioned.

Example:

```text
/api/v1/auth/...
/api/v1/users/...
/api/v1/applications/...
/api/v1/oauth/...
```

Versioning allows future API evolution without unexpectedly breaking existing integrations.

---

# 60. Request Processing

A typical request follows:

```text
HTTP Request
     │
     ▼
Middleware
     │
     ▼
Guards
     │
     ▼
Controller
     │
     ▼
DTO Validation
     │
     ▼
Service / Use Case
     │
     ▼
Repository
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
```

The controller should not contain large business logic.

---

# 61. Example Login Architecture

```text
POST /api/v1/auth/login
          │
          ▼
AuthController
          │
          ▼
Login DTO
          │
          ▼
AuthService
          │
          ├── User lookup
          │       │
          │       ▼
          │    UserRepository
          │       │
          │       ▼
          │     Prisma
          │
          ├── Verify password
          │
          ├── Check account status
          │
          └── Create authentication result
```

---

# 62. Validation

AUTHREX should reject malformed requests before business logic.

Example:

```json
{
  "email": "invalid",
  "unexpectedField": "attack"
}
```

The validation layer should reject invalid data and unwanted fields.

NestJS global validation should use strict settings such as:

```text
whitelist: true
forbidNonWhitelisted: true
transform: true
```

---

# 63. Error Handling

AUTHREX should expose consistent API errors.

Example:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "error": "BAD_REQUEST",
  "timestamp": "2026-09-06T12:00:00Z",
  "path": "/api/v1/auth/login"
}
```

Internal implementation details should not be leaked.

Never return:

```text
Prisma stack trace
database credentials
internal file paths
secret values
password hashes
```

---

# 64. Authentication Error Design

Be careful about information leakage.

For example, blindly returning:

```text
Email does not exist
```

can enable account enumeration.

Authentication errors should be designed according to the security requirements of the product.

---

# 65. Frontend Architecture

Next.js is responsible for the AUTHREX web experience.

Major areas can eventually include:

```text
/
├── Landing
├── Login
├── Register
├── Verify Email
├── Forgot Password
├── Account
├── Security
├── Sessions
├── Developer Dashboard
├── Applications
├── OAuth Configuration
└── Consent
```

These should be developed according to the corresponding backend capabilities.

---

# 66. Developer Experience

AUTHREX should make integration straightforward.

The desired developer journey:

```text
Developer
   │
   ▼
Create AUTHREX account
   │
   ▼
Create application
   │
   ▼
Configure redirect URI
   │
   ▼
Select scopes
   │
   ▼
Receive Client ID
   │
   ▼
Integrate SDK / OAuth
   │
   ▼
Test authentication
   │
   ▼
Deploy
```

---

# 67. Documentation

AUTHREX should provide developer documentation covering:

```text
Getting Started
Application Registration
SDK
Login Integration
OAuth 2.0
OIDC
Redirect URIs
PKCE
Scopes
Consent
Token Handling
Logout
Security
API Reference
Errors
Examples
```

Documentation is a product feature because AUTHREX's success depends heavily on developer integration.

---

# 68. Production Security Principles

AUTHREX must follow these rules:

### Never store plaintext passwords.

### Never put secrets into frontend JavaScript.

### Never expose client secrets to public clients.

### Never log authentication credentials.

### Never accept arbitrary redirect URIs.

### Never trust client-provided identity information.

### Never expose internal database errors.

### Never use insecure wildcard CORS permanently.

### Never blindly trust JWT claims without validation.

### Never treat authentication as authorization.

### Never implement OAuth security as custom ad-hoc logic when a standards-compliant flow is required.

---

# 69. Configuration

Environment-specific configuration should be externalized.

Initial environment concept:

```text
NODE_ENV
PORT
DATABASE_URL
CORS_ORIGIN
```

Authentication-specific secrets/configuration should be introduced when the corresponding authentication/token functionality is implemented.

Do not create unnecessary mandatory environment variables before they are required.

---

# 70. Infrastructure

The infrastructure layer provides technical implementations used by modules.

Conceptually:

```text
Infrastructure
│
├── Database
│   └── Prisma
│
├── Email
│
├── Cache
│   └── Redis later
│
├── Storage
│
└── Webhooks
```

Business modules should not become tightly coupled to infrastructure implementation details.

---

# 71. Redis

Redis is a future infrastructure component.

Potential uses:

```text
Rate limiting
Temporary authorization state
Short-lived authentication data
Caching
Distributed session-related state
```

It should not be introduced merely because it may be useful later.

---

# 72. AUTHREX as a SaaS Platform

The long-term architecture can support multiple applications and developers.

Conceptually:

```text
                   AUTHREX
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
   Developer A    Developer B    Developer C
       │              │              │
    TaskFlow       ShopApp       CineApp
       │              │              │
       └──────────────┼──────────────┘
                      │
                 AUTHREX Identity
```

A single AUTHREX infrastructure serves many client applications.

---

# 73. Multi-Application Identity

One AUTHREX user may authenticate into multiple applications.

Example:

```text
                  AUTHREX User
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       TaskFlow     ShopSphere   CineVibe
```

Each application has its own client configuration.

AUTHREX remains the identity authority.

---

# 74. Application Isolation

Application A must not automatically access Application B's configuration or credentials.

For example:

```text
TaskFlow Client
     │
     └── TaskFlow configuration only

ShopSphere Client
     │
     └── ShopSphere configuration only
```

Authorization boundaries must exist between developer/application resources.

---

# 75. Long-Term Product Vision

AUTHREX can eventually evolve into:

```text
Authentication
       +
Identity
       +
Authorization
       +
OAuth
       +
OpenID Connect
       +
Security
       +
Developer Platform
       +
SDK
       +
Observability
```

This makes AUTHREX an identity infrastructure product rather than simply a login API.

---

# 76. Development Roadmap

The implementation must proceed incrementally.

## Phase 0 — Backend Foundation

Build:

```text
NestJS
Configuration
Prisma
PostgreSQL
Global validation
Exception handling
API versioning
CORS
Testing foundation
```

No OAuth yet.

---

## Phase 1 — User

Build:

```text
users table
User module
User repository
User service
User lifecycle
```

---

## Phase 2 — Authentication

Build:

```text
Registration
Password hashing
Login
Authentication validation
JWT
Protected endpoints
Email verification
```

---

## Phase 3 — Sessions

Build:

```text
Sessions
Refresh tokens
Logout
Revocation
Token rotation
```

---

## Phase 4 — Applications

Build:

```text
Application registration
Client IDs
Application types
Redirect URI management
Application status
Developer management
```

---

## Phase 5 — OAuth 2.0

Build:

```text
Authorization endpoint
Client validation
Redirect URI validation
Authorization codes
Token endpoint
PKCE
Scopes
```

---

## Phase 6 — OpenID Connect

Build:

```text
OIDC discovery
ID tokens
UserInfo
openid scope
OIDC claims
```

---

## Phase 7 — AUTHREX SDK

Build:

```text
Login with AUTHREX
Button rendering
Popup flow
Account chooser
Callback handling
SDK integration
```

---

## Phase 8 — Advanced Security

Build:

```text
MFA
Rate limiting
Audit logs
Security notifications
Session management UI
Suspicious activity detection
Monitoring
```

---

# 77. What AUTHREX Is NOT

AUTHREX is not intended to be:

```text
A normal application-specific login system
```

It is also not:

```text
A database wrapper
```

It is not:

```text
A simple JWT generator
```

And it should not become:

```text
A collection of unrelated authentication utilities
```

The platform's central responsibility is:

> **Provide a secure, standards-based identity and authentication layer that external applications can integrate with.**

---

# 78. Most Important Architectural Rule

Every feature must have a clear owner.

For example:

```text
User identity
    → User Module

Authentication
    → Auth Module

Sessions
    → Session Module

External applications
    → Application Module

OAuth protocol
    → OAuth Module

Consent
    → Consent Module

Scopes
    → Scope Module

Audit events
    → Audit Module

Email/notifications
    → Notification Module
```

Do not put everything into `AuthService`.

A giant:

```text
AuthService
```

containing:

```text
users
sessions
OAuth
tokens
consent
applications
emails
MFA
audit logs
```

would eventually become difficult to maintain.

---

# 79. Dependency Direction

The architecture should generally flow toward business capabilities.

Example:

```text
Auth
 │
 ▼
User
 │
 ▼
Infrastructure
 │
 ▼
Prisma
 │
 ▼
PostgreSQL
```

Not:

```text
User
 │
 ▼
Auth
```

if the User module does not actually need authentication orchestration.

Avoid circular dependencies.

---

# 80. Initial Implementation Philosophy

The team should follow:

> **Architecture first. Business features second.**

The first implementation should establish a strong foundation.

Do not prematurely implement:

```text
OAuth
OIDC
MFA
Redis
refresh tokens
consent
application management
```

before the underlying architecture is ready.

Likewise, do not create speculative database tables simply because they will exist in the final product.

---

# 81. Current Product Boundary

At the beginning, AUTHREX should be treated as:

```text
NestJS
   │
   ▼
Feature-based architecture
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

with:

```text
Auth Module
User Module
```

as the initial business modules.

The remaining modules are architectural destinations rather than necessarily implemented features.

---

# 82. Final Mental Model for Developers

Any developer joining AUTHREX should understand the system using this model:

```text
                         ┌───────────────────────┐
                         │        AUTHREX        │
                         │                       │
                         │  Identity Provider     │
                         └───────────┬───────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
              ▼                      ▼                      ▼
          AUTHENTICATE          AUTHORIZE              IDENTIFY
              │                      │                      │
              ▼                      ▼                      ▼
             User                  OAuth                 OIDC
                                     │                      │
                                     └──────────┬───────────┘
                                                │
                                                ▼
                                      External Applications
```

The complete ecosystem becomes:

```text
                    ┌─────────────────────────┐
                    │        AUTHREX          │
                    │                         │
                    │  Identity Platform      │
                    └────────────┬────────────┘
                                 │
       ┌─────────────────────────┼─────────────────────────┐
       │                         │                         │
       ▼                         ▼                         ▼
 Authentication             Authorization              Identity
       │                         │                         │
       ▼                         ▼                         ▼
   Credentials                OAuth 2.0                 OIDC
   Sessions                   Scopes                    ID Token
   Security                   Consent                   UserInfo
       │                         │                         │
       └─────────────────────────┼─────────────────────────┘
                                 │
                                 ▼
                         Developer Platform
                                 │
                         ┌───────┴────────┐
                         ▼                ▼
                       SDK             Dashboard
                         │                │
                         ▼                ▼
                    Application      Configuration
```

---

# 83. One-Sentence Definition

If a developer asks:

> **"What exactly are we building?"**

The answer should be:

**AUTHREX is a secure identity and authentication platform that allows external applications to authenticate and identify their users through AUTHREX using standardized OAuth 2.0/OpenID Connect flows and an easy developer integration experience.**

---

# 84. Core Product Principle

The most important principle for the entire team is:

> **AUTHREX owns the identity and authentication process; client applications consume the resulting authenticated identity according to explicitly granted permissions.**

That principle should guide every future architectural and business decision.
