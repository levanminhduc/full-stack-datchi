# Responsive UI Components Plan

## 1. Analysis of Current Component Usage

### Current State
- **Feature-Specific Implementations**: Features like `EmployeeList` currently implement their own responsive logic (e.g., switching between `Table` and `Card` views based on `useMediaQuery`).
- **Inconsistent Empty States**: `EmployeeList` and `TodoList` implement different empty state patterns.
- **Missing Feedback**: No standardized way to show loading states, errors, or success notifications (toasts).
- **Layout Logic**: Layout responsiveness is currently hardcoded in `Header` and `Sidebar`.

### Opportunities for Abstraction
1.  **Data Display**: The pattern of "Table on Desktop, Cards on Mobile" in `EmployeeList` is a common pattern that should be a shared component (`ResponsiveTable`).
2.  **Status Indicators**: `EmployeeStatusChip` can be generalized into a generic `StatusChip`.
3.  **Page Structure**: Common page headers with titles and action buttons need a standardized responsive layout.

## 2. Proposed Component Architecture

### A. Essential UI Components (`src/shared/components/ui/`)

#### 1. `ResponsiveTable<T>`
**Purpose**: A data display component that automatically switches between a standard HTML table on desktop and a stacked card view on mobile.
**Props**:
- `columns`: Array defining headers and data accessors.
- `data`: Array of data objects.
- `renderMobileCard`: Function to render a single item as a card on mobile.
- `onRowClick`: Optional handler.
**Responsive Behavior**:
- **md/lg/xl**: Renders MUI `Table`.
- **xs/sm**: Renders a `Stack` of `Card` components using `renderMobileCard`.
**MUI Components**: `Table`, `TableBody`, `TableCell`, `TableContainer`, `TableHead`, `TableRow`, `Card`, `Stack`.

#### 2. `ResponsiveButton`
**Purpose**: A wrapper around MUI `Button` that ensures touch targets are large enough on mobile.
**Props**: Standard MUI Button props.
**Responsive Behavior**:
- **mobile**: Min-height 44px (touch target size). Full width option for primary actions.
- **desktop**: Standard MUI sizing.

#### 3. `PageHeader`
**Purpose**: Standardizes the top of a page with title, breadcrumbs (optional), and action buttons.
**Props**:
- `title`: string.
- `actions`: ReactNode (usually buttons).
**Responsive Behavior**:
- **mobile**: Stacked layout. Title on top, actions below (full width).
- **desktop**: Flex row. Title on left, actions on right.

#### 4. `StatusChip`
**Purpose**: Generic status indicator with consistent styling.
**Props**:
- `status`: string (key).
- `config`: Map of status keys to colors/labels.
- `variant`: 'outlined' | 'filled' (default 'filled' or 'soft').

#### 5. `ResponsiveModal` (Dialog)
**Purpose**: A dialog that behaves like a modal on desktop and a full-screen or bottom-sheet drawer on mobile.
**Props**: Standard MUI Dialog props + `trigger` (optional).
**Responsive Behavior**:
- **mobile**: `fullScreen` = true, or styled as a bottom drawer.
- **desktop**: Standard centered modal.

### B. Feedback Components (`src/shared/components/feedback/`)

#### 1. `LoadingState`
**Purpose**: Standardized loading indicator.
**Props**:
- `type`: 'spinner' | 'skeleton' | 'overlay'.
- `rows`: number (for skeleton).
**Usage**: Replaces content while data is fetching.

#### 2. `EmptyState`
**Purpose**: Friendly placeholder when no data exists.
**Props**:
- `title`: string.
- `description`: string.
- `icon`: ReactNode.
- `action`: ReactNode (optional button).
**Responsive Behavior**: Centered text and icon, responsive padding.

#### 3. `ConfirmDialog`
**Purpose**: Pre-configured dialog for destructive actions.
**Props**:
- `open`: boolean.
- `title`: string.
- `content`: string.
- `onConfirm`: () => void.
- `onCancel`: () => void.
- `severity`: 'error' | 'warning' | 'info'.

#### 4. `ErrorBoundary`
**Purpose**: Catch render errors and show a fallback UI instead of crashing the app.
**Props**: `children`: ReactNode.

## 3. Implementation Plan

### Phase 1: Foundation & Feedback (High Priority)
*These are easy to implement and immediately improve UX consistency.*
1.  **LoadingState**: Create generic spinner/skeleton wrapper. (Complexity: Low)
2.  **EmptyState**: Create reusable empty placeholder. (Complexity: Low)
3.  **ConfirmDialog**: Create generic confirmation modal. (Complexity: Low)

### Phase 2: Core UI Abstractions (Medium Priority)
*These refactor existing patterns to reduce code duplication.*
1.  **ResponsiveTable**: Abstract the `EmployeeList` logic. (Complexity: High)
2.  **PageHeader**: Standardize page tops. (Complexity: Low)
3.  **StatusChip**: Generalize `EmployeeStatusChip`. (Complexity: Low)

### Phase 3: Advanced Interaction (Low Priority)
*These enhance the mobile experience further.*
1.  **ResponsiveModal**: Optimize forms/details for mobile. (Complexity: Medium)
2.  **ResponsiveButton**: Enforce touch targets. (Complexity: Low)

## 4. Documentation & Examples

Each component will include JSDoc comments explaining props and usage.
Example usage for `ResponsiveTable`:

```tsx
<ResponsiveTable
  columns={[
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'role', label: 'Role', align: 'left' },
  ]}
  data={employees}
  renderMobileCard={(employee) => (
    <EmployeeCard employee={employee} />
  )}
/>
```
