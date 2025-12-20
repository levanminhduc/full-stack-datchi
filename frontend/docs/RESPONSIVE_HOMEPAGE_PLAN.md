# Responsive Homepage Optimization Plan

## 1. Current State Analysis

### Architecture
- **Framework**: React + TypeScript + Vite
- **UI Library**: Material UI (MUI) v5
- **Layout System**: Mixed usage of `Stack` and `Box` with some responsive props.
- **Global Styles**: Default Vite CSS (`index.css`) containing potential conflicts.

### Identified Issues
1.  **Global CSS Conflicts**: `index.css` contains `body { display: flex; place-items: center; }` which forces the entire app to center vertically/horizontally. This breaks standard dashboard layouts which should fill the screen from the top-left.
2.  **Rigid Typography**: Font sizes (e.g., `h4` in StatCard, `h1` in CSS) are static. The `h1` in `index.css` (3.2em) overrides MUI defaults aggressively.
3.  **Limited Grid Control**: usage of `Stack` (`direction={{ xs: 'column', sm: 'row' }}`) causes elements to jump from 1 column to 3 columns directly, missing a 2-column layout for tablets.
4.  **Component Sizing**: Fixed dimensions for icon containers (56px/64px) take up too much valuable screen real estate on mobile.
5.  **Touch Targets**: Some interactive elements may need verification for 44px minimum touch target size on mobile.

## 2. Breakpoint Strategy
We will utilize MUI's default breakpoints with a "Mobile-First" approach:

| Breakpoint | Value | Device Type | Strategy |
|------------|-------|-------------|----------|
| `xs` | 0px | Mobile (Portrait) | Single column, minimized padding, large touch targets |
| `sm` | 600px | Mobile (Landscape) / Tablet (Portrait) | Two columns, increased padding |
| `md` | 900px | Tablet (Landscape) / Small Laptop | Sidebar appears, grid expands |
| `lg` | 1200px | Desktop | Full 3-4 column grid, max content width |
| `xl` | 1536px | Large Desktop | Centered content with max-width |

## 3. Implementation Plan

### Phase 1: Global & Theme Cleanup
1.  **`frontend/src/index.css`**:
    - Remove `body` flex centering styles.
    - Remove hardcoded `h1` font size.
    - Ensure `root` fills viewport height.
2.  **`frontend/src/theme/typography.ts`**:
    - Implement MUI's `responsiveFontSizes` utility or manually define font sizes for breakpoints.

### Phase 2: Layout Optimization
**Target**: `frontend/src/app/layouts/DashboardLayout.tsx`
- Adjust `Box` (main content) padding:
    - `p: { xs: 2, sm: 3 }` (Reduce padding on mobile)
- Verify `mt` (margin top) for header clearance works dynamically across screen sizes.

### Phase 3: Component Refactoring

#### A. HomePage (`frontend/src/features/home/pages/HomePage.tsx`)
- **Grid System**: Replace `Stack` with MUI `Grid` (v2 preferred if available, else v1).
    - **Stats Section**:
        - `xs`: 12 (1 item/row)
        - `sm`: 6 (2 items/row) - *New Tablet View*
        - `md`: 4 (3 items/row)
    - **Quick Actions Section**:
        - Same grid logic as Stats.

#### B. StatCard (`frontend/src/features/home/components/StatCard.tsx`)
- **Typography**: Use `variant="h5"` for mobile and `h4` for desktop for values.
- **Icon Box**:
    - Reduce size on mobile: `width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 }`.
- **Spacing**: Adjust internal padding.

#### C. QuickActions (`frontend/src/features/home/components/QuickActions.tsx`)
- **Layout**: Switch internal `Box` flex direction to column on very small screens if needed, or keep row but reduce icon size.
- **Buttons**: Ensure `fullWidth` is preserved on mobile.

## 4. Component Modification Checklist

### `frontend/src/index.css`
- [ ] Remove `display: flex` and `place-items: center` from `body`.
- [ ] Remove `h1` rule.

### `frontend/src/features/home/pages/HomePage.tsx`
- [ ] Convert `Stack` containers to `Grid container`.
- [ ] Wrap `StatCard` and `QuickActions` items in `Grid item`.
- [ ] Define columns: `xs={12} sm={6} md={4}`.

### `frontend/src/features/home/components/StatCard.tsx`
- [ ] Add responsive sizing to Icon wrapper `Box`.
- [ ] Add responsive variant/fontSize to `Typography`.

### `frontend/src/app/layouts/DashboardLayout.tsx`
- [ ] Update main content padding to be responsive (`p: { xs: 2, sm: 3 }`).

### `frontend/src/theme/index.ts`
- [ ] Wrap theme creation with `responsiveFontSizes`.

## 5. Visual Reference (Mermaid)

```mermaid
graph TD
    subgraph Mobile[Mobile View xs]
        M_Header[Header]
        M_Stat1[Stat Card 1]
        M_Stat2[Stat Card 2]
        M_Stat3[Stat Card 3]
        M_Act1[Action 1]
        M_Act2[Action 2]
        M_Header --> M_Stat1
        M_Stat1 --> M_Stat2
        M_Stat2 --> M_Stat3
        M_Stat3 --> M_Act1
        M_Act1 --> M_Act2
    end

    subgraph Tablet[Tablet View sm]
        T_Header[Header]
        T_Grid1[Row 1: Stat 1 | Stat 2]
        T_Grid2[Row 2: Stat 3 | Empty]
        T_Header --> T_Grid1
        T_Grid1 --> T_Grid2
    end

    subgraph Desktop[Desktop View md+]
        D_Side[Sidebar]
        D_Main[Main Content]
        D_Row1[Row 1: Stat 1 | Stat 2 | Stat 3]
        D_Row2[Row 2: Action 1 | Action 2]
        
        D_Side --> D_Main
        D_Main --> D_Row1
        D_Row1 --> D_Row2
    end
```
