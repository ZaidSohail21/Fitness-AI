You are a Senior Staff Software Engineer, Solution Architect, UI/UX Engineer, Security Engineer, and Full Stack Next.js Developer with 15+ years of experience building scalable SaaS products.

Your task is to build the COMPLETE FOUNDATION of a production-ready SaaS application.

Project Name:
FitSync AI

IMPORTANT RULES

• Think like a startup engineer, not an AI code generator.
• Build scalable architecture.
• Write clean, modular, maintainable code.
• Follow industry best practices.
• Do NOT generate unnecessary code.
• Do NOT duplicate components.
• Use feature-based architecture.
• Use TypeScript everywhere.
• Use strict typing.
• Make everything reusable.
• Make everything responsive.
• Use modern UI/UX.

==========================================
CURRENT SCOPE
==========================================

This phase is ONLY the project foundation.

DO NOT implement any workout CRUD.

DO NOT implement AI.

DO NOT implement realtime.

DO NOT implement chat.

DO NOT implement notifications.

DO NOT implement Chrome Extension.

DO NOT implement React Native.

DO NOT implement Tauri.

Only prepare the architecture so those features can be added later without refactoring.

==========================================
FUTURE ROADMAP (DO NOT TOUCH)
==========================================

Later this project will have

• Workout Tracking
• AI Coach
• AI Workout Generator
• AI Diet Suggestions
• Supabase Realtime
• Chat
• Notifications
• HTML Canvas
• Chrome Extension
• React Native Expo
• Tauri Desktop App

Design the architecture so these modules can plug in easily.

Do NOT create them now.

==========================================
TECH STACK
==========================================

Frontend

• Next.js 15+
• React 19
• TypeScript
• Tailwind CSS
• shadcn/ui
• Lucide React
• Framer Motion

Backend

• Next.js App Router
• Server Actions
• Route Handlers

Database

• Supabase PostgreSQL

ORM

• Prisma

Authentication

• Supabase Auth

Validation

• Zod

Forms

• React Hook Form

State

• Zustand

Server State

• TanStack Query

Emails

• Resend

Security

• Google reCAPTCHA v3

Storage

• Supabase Storage

Notifications

• Sonner

Theme

• next-themes

Deployment

• Vercel

==========================================
PROJECT STRUCTURE
==========================================

Create a scalable feature-first architecture.

Example

src/

app/

components/

features/

auth/

dashboard/

profile/

shared/

lib/

actions/

hooks/

providers/

services/

types/

utils/

emails/

prisma/

styles/

middleware.ts

Do NOT use messy folder structures.

==========================================
UI SYSTEM
==========================================

Build a professional SaaS UI.

Theme

White

Light Gray

Black

Accent

Blue / Indigo

Use green ONLY for

• success
• graphs
• progress indicators

Do NOT make the entire website green.

The design should feel similar to

• Linear
• Vercel
• Clerk
• Stripe Dashboard
• Notion

Do NOT copy.

==========================================
CREATE THESE PAGES
==========================================

Landing Page

Hero

Features

Benefits

Dashboard Preview

FAQ

Footer

Authentication

Login

Register

Forgot Password

Reset Password

Verify Email

2FA Verification

Dashboard Layout

Sidebar

Navbar

Search

Theme Toggle

Notifications Button

Profile Dropdown

Responsive Layout

Profile

General

Security

Avatar Upload

Appearance

Account Settings

System Pages

404

500

Loading

Empty State

Unauthorized

Maintenance

==========================================
COMPONENT SYSTEM
==========================================

Create reusable components only.

Examples

Button

Input

Textarea

Select

Checkbox

Radio

Badge

Avatar

Modal

Dialog

Drawer

Dropdown

Tabs

Table

Pagination

Card

Stats Card

Search Input

Theme Toggle

Loading Skeleton

Breadcrumb

Confirm Dialog

Delete Dialog

File Upload

==========================================
SUPABASE
==========================================

Configure

Supabase Client

Supabase Server Client

Supabase Middleware

Supabase Auth

Supabase Storage

Environment Variable helpers

Do NOT hardcode secrets.

I'll provide the .env later.

Leave placeholders where required.

==========================================
PRISMA
==========================================

Install

Initialize

Create Prisma Client

Configure migrations

Create seed script

Configure PostgreSQL

Do NOT create business models yet.

Only create

User

Role

Session (if needed)

==========================================
AUTHENTICATION
==========================================

Implement

Email Login

Register

Email Verification

Forgot Password

Reset Password

Protected Routes

Session Management

Role Based Access

Middleware

==========================================
2FA
==========================================

Implement Email OTP 2FA.

Architecture should support Authenticator Apps later.

Flow

Login

↓

Email + Password

↓

Email OTP

↓

Verify

↓

Dashboard

==========================================
EMAILS
==========================================

Using Resend create professional templates for

Welcome Email

Verify Email

Reset Password

2FA OTP

Use reusable React Email components.

==========================================
SECURITY
==========================================

Implement

Google reCAPTCHA v3

Route Protection

Server Validation

Zod Validation

Rate Limiting

Secure Cookies

Environment Validation

Input Sanitization

API Validation

==========================================
STORAGE
==========================================

Configure Supabase Storage.

Create buckets

avatars

documents

progress-images

Do not implement uploads yet.

==========================================
STATE MANAGEMENT
==========================================

Use

TanStack Query

Zustand

React Hook Form

Avoid unnecessary global state.

==========================================
THEME
==========================================

Implement

Dark

Light

System

Save preference.

==========================================
ERROR HANDLING
==========================================

Global Error Boundary

404

500

Loading

Toast Notifications

==========================================
RESPONSIVENESS
==========================================

Desktop

Tablet

Mobile

Use responsive layouts from the beginning.

==========================================
CODE QUALITY
==========================================

Use

ESLint

Prettier

Absolute Imports

Strict TypeScript

Reusable Hooks

Reusable Services

Reusable Utilities

No duplicated code.

==========================================
WHAT I WILL DO
==========================================

I will manually provide

.env variables

Supabase Project

Resend Keys

Google reCAPTCHA Keys

Database URL

Do NOT ask me to configure anything else.

Everything else should be fully implemented automatically.

==========================================
IMPORTANT
==========================================

When making changes

• Think before coding.

• Build the architecture first.

• Then components.

• Then authentication.

• Then database.

• Then security.

• Then UI.

Do not rush into writing pages without creating a scalable architecture.

Do not leave TODOs.

Do not use placeholder implementations unless absolutely required for secrets.

Generate production-ready code.