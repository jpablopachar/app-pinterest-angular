# GitHub Copilot Project Instructions

## Project Overview

This project is an Angular-based Pinterest clone that allows users to discover, save, and share visual content. The application features:

- User authentication (register, login, logout)
- Visual content discovery through a responsive gallery interface
- User profiles with follow functionality
- Content organization through boards and pins
- Search functionality for finding specific content
- Virtual scrolling for efficient rendering of large content lists
- Responsive design for optimal viewing across devices

The application follows modern Angular practices including signals for state management and standalone components for better modularity and performance.

## Architecture Guidelines

- **Standalone Components**: Use Angular's standalone components to promote modularity and reduce bundle size.
- **Signal-based State Management**: Utilize Angular's signals for reactive state management instead of NgRx or traditional RxJS approaches.
- **Lazy Loading**: Implement lazy loading for all routes to improve initial load time.
- **HTTP Resource Pattern**: Use Angular's httpResource for data fetching and caching when appropriate.
- **Service Layer**: Implement a dedicated service layer for all API communication and business logic.
- **Component Composition**: Build complex UIs through composition of smaller, reusable components.
- **Reactive Approach**: Use a reactive programming paradigm throughout the application with signals and RxJS.
- **Unidirectional Data Flow**: Follow unidirectional data flow principles to maintain predictable state changes.
- **Smart vs. Presentational Components**: Separate concerns between smart components (with business logic) and presentational components (for UI only).

## Folder Structure

The project follows a feature-based folder structure with a clear separation of concerns:

```
src/
├── app/
│   ├── components/            # Reusable UI components used across features
│   │   ├── common/            # General-purpose components (buttons, cards, etc.)
│   │   └── feature/           # Feature-specific components (Pin, Board, etc.)
│   ├── layouts/               # Layout components (shells for page structure)
│   ├── models/                # TypeScript interfaces, types, and data models
│   ├── pages/                 # Page components (smart containers) organized by feature
│   ├── routes/                # Route configurations and guards
│   ├── services/              # Services for API communication and business logic
│   ├── store/                 # Signal-based state management stores
│   ├── types/                 # TypeScript type definitions and utility types
│   ├── utils/                 # Helper functions and utility services
│   ├── pipes/                 # Custom Angular pipes
│   ├── directives/            # Custom Angular directives
│   ├── app.config.ts          # Application configuration
│   ├── app.routes.ts          # Root routes configuration
│   └── app.component.ts       # Root component
├── assets/                    # Static assets (images, icons, fonts)
├── environments/              # Environment-specific configuration
└── styles/                    # Global styles and theme variables
```

### Component Pattern

Components should follow these structural patterns:

1. **File Naming**:

   - `ComponentName.component.ts` - Component logic
   - `ComponentName.component.html` - Component template
   - `ComponentName.component.css` - Component styles

2. **Standalone Components**:

   - Use the `standalone: true` configuration
   - Import dependencies directly in the component
   - Export the component for use in other parts of the application

3. **Component Structure**:

   - Implement `ChangeDetectionStrategy.OnPush` for performance optimization
   - Use input signals (`input<T>()`) for component inputs
   - Use read-only signals for exposing state to templates
   - Keep component-specific logic encapsulated within the component

4. **Component Responsibility Separation**:

   - Smart components: Handle data fetching, state management, and business logic
   - Presentational components: Focus on rendering and UI interactions
   - Container components: Compose multiple components and provide data flow between them

5. **Event Handling**:

   - Use output events for child-to-parent communication
   - Implement proper event handlers for user interactions
   - Use descriptive names for event handler methods (e.g., `onScroll`, `onClick`)

6. **Template Patterns**:
   - Use structural directives (`*ngIf`, `*ngFor`) efficiently
   - Implement trackBy functions for \*ngFor loops
   - Use ng-container for grouping elements without adding extra DOM nodes
   - Apply accessibility attributes for better user experience

## Code Style Guideline

### Naming Conventions

- **Files and Folders**:
  - Use kebab-case for file and folder names (e.g., `pin-gallery`, `auth-form`)
  - Use descriptive, feature-related names for folders
  - Group related files in the same directory

- **Components**:
  - Use PascalCase for component class names (e.g., `PinGalleryComponent`, `AuthFormComponent`)
  - Use kebab-case for component selectors with a custom prefix (e.g., `app-pin-gallery`, `app-auth-form`)
  - Use suffixes to identify file types:
    - `.component.ts` - Component logic
    - `.component.html` - Component template
    - `.component.css` - Component styles
    - `.component.spec.ts` - Component tests

- **Services**:
  - Use PascalCase for service class names (e.g., `AuthService`, `PinService`) with a `.service.ts` suffix
  - Use descriptive names that clearly indicate the service's functionality

- **Interfaces and Models**:
  - Use PascalCase for interface and model names (e.g., `Pin`, `User`, `AuthResponse`)
  - Prefer not to use 'I' prefix for interfaces
  - Use `.model.ts` suffix for model files, `.interface.ts` for interface-only files
  - Organize related models and interfaces in dedicated files

- **Variables**:
  - Use camelCase for variable and property names
  - For signals, use '$' prefix (e.g., `$pins`, `$loading`)
  - For private class members, use '_' prefix (e.g., `_http`, `_authService`)
  - Use descriptive names that clearly indicate purpose

- **Methods**:
  - Use camelCase for method names (e.g., `getPins`, `followUser`)
  - Use verb prefixes for action methods (e.g., `fetchData`, `submitForm`)
  - Use 'on' prefix for event handlers (e.g., `onClick`, `onSubmit`)
  - Use 'get' prefix for accessor methods (e.g., `getUserProfile`)

- **Constants**:
  - Use UPPER_SNAKE_CASE for global constants
  - Use PascalCase for enum values
  - Group related constants in a namespace or a dedicated constants file

- **Stores**:
  - Use PascalCase with 'Store' suffix for store classes (e.g., `AuthStore`, `PinStore`)
  - Use camelCase for store methods and properties
  - Use '$' prefix for signal properties in stores

### Documentation

- All documentation and comments must be written in Spanish.
- Use JSDoc format for documenting methods, classes, and interfaces.
- Each public method should include:
  - Description of what the method does
  - @param for each parameter with description
  - @returns description of what is returned
  - @remarks for additional information when necessary
- Include examples for complex functionalities.
- Every component should have a clear description of its purpose and usage.

Example format:

```typescript
/**
 * [Spanish description of what the method does]
 *
 * @param paramName - [Spanish description of the parameter]
 * @returns [Spanish description of the return value]
 * @remarks [Additional Spanish notes if needed]
 */
```
### State Management

- **Signal-Based State**: Use Angular signals as the primary state management mechanism for reactive applications.
  - Use `signal<T>()` to create a writable signal for mutable state
  - Use `computed()` to derive state from other signals
  - Use `effect()` for side effects in response to signal changes
  - Use `.set()` for replacing state and `.update()` for transforming existing state
  
- **Signal Store Pattern**: Implement a store pattern using signals for more complex state management.
  - Create store classes to encapsulate related state and logic
  - Expose read-only signals (`asReadonly()`) to prevent external mutation
  - Implement methods to update state in a controlled manner
  - Use `patchState()` for partial state updates in signal stores

- **Component State Management**:
  - Keep component-specific state within the component using signals
  - For shared state, use injectable services with signals
  - Lift state up to parent components or dedicated store services when needed
  - Use inputs and outputs for component communication

- **State Organization**:
  - Organize state based on domain/feature areas (auth, pins, boards)
  - Keep UI state separate from domain state
  - Use models and interfaces to strongly type all state
  - Document the state shape and purpose with JSDoc comments in Spanish

- **State Access Patterns**:
  - Use dependency injection to provide state from services to components
  - Create selector functions for derived state
  - Implement facade patterns for complex features
  - Use the async pipe with signals when appropriate

Example signal store implementation with Spanish documentation:

```typescript
/**
 * Almacén de autenticación que gestiona el estado del usuario actual y sus operaciones.
 * 
 * @remarks Utiliza el patrón de Signal Store para proporcionar gestión de estado reactiva.
 */
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({ currentUser: null }),
  withDevtools('auth'),
  withMethods((store) => ({
    /**
     * Establece el usuario actual en el almacén.
     * 
     * @param user - Respuesta de autenticación que contiene los datos del usuario
     */
    setCurrentUser(user: AuthResponse): void {
      patchState(store, { currentUser: user });
    },
    
    /**
     * Elimina los datos del usuario actual del almacén.
     * Útil para operaciones de cierre de sesión.
     */
    removeCurrentUser(): void {
      patchState(store, { currentUser: null });
    }
  }))
);
```

### Performance Optimization

- Use Angular's OnPush change detection strategy to reduce unnecessary rendering cycles.
- Implement virtual scrolling for large lists using `ScrollingModule` from `@angular/cdk/scrolling`.
- Utilize signals for reactive state management.
- Use lazy loading for modules and components to reduce initial load time.
- Implement data pagination for large datasets.
- Cancel ongoing HTTP requests when components are destroyed or new requests are made.
- Use memoization techniques for expensive computations.
- Properly unsubscribe from observables to prevent memory leaks.

### Error Handling

- Implement centralized error handling for HTTP requests.
- Use signal-based error state management.
- Always handle errors gracefully with user-friendly error messages in Spanish.
- Use try-catch blocks for synchronous code that might throw exceptions.
- For HTTP requests, use the catchError operator from RxJS.
- Log critical errors for debugging purposes.
- Implement retry mechanisms for network requests when appropriate.
- Display appropriate loading states during asynchronous operations.

## Specific Patterns to Follow

### Authentication Flow

- Use the `AuthService` for all authentication-related operations.
- Implement token-based authentication with JWT.
- Store authentication tokens securely (preferably in HttpOnly cookies).
- Create route guards to protect authenticated routes.
- Handle token refresh automatically.
- Manage user sessions with appropriate timeout mechanisms.
- Implement proper logout functionality that clears all user data.
- Use signals for reactive authentication state management:
  - `$loading` for authentication operation status
  - `$error` for authentication error messages
  - `$authResponse` for auth operation responses
  - `$userProfile` for current user profile information

### Form Handling

- Use Angular's Reactive Forms for form management.
- Implement proper form validation with clear error messages in Spanish.
- Create reusable form components when possible.
- Use form builders to create complex forms.
- Implement async validators for server-side validation when needed.
- Show validation errors only after form control has been touched or form submitted.
- Use consistent styling for form elements and error messages.
- Create custom form controls when necessary for complex input types.

### API Integration

- Use the HttpClient for all API calls.
- Implement service classes for API endpoints (like `AuthService`, `PinService`).
- Use environment configuration for API URLs.
- Implement request cancellation using RxJS subjects.
- Structure API responses with typed interfaces.
- Handle API errors gracefully with informative user messages.
- Use signal-based state management for API call states:
  - Loading state
  - Error state
  - Success state with response data
- Implement pagination handling for list endpoints.
- Use query parameters to filter and search data.

## Styling Approach

- Use component-scoped CSS files with the `.component.css` suffix.
- Implement responsive design using CSS Grid and Flexbox.
- Create reusable CSS variables for theming.
- Use consistent naming conventions for CSS classes.
- Implement a mobile-first approach to CSS.
- Create reusable UI components for common elements.
- Use Angular animations for transitions and interactive elements.
- Ensure accessibility compliance with proper ARIA attributes and color contrast.

## Important Note

- While the codebase and instructions are in English, all documentation, comments, and user-facing text should be maintained in Spanish.
