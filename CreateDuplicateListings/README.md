# CreateDuplicateListings Component

A React component converted from Bubble.io reusable element that allows users to create new property listings or duplicate existing ones.

## Features

- ✅ **Create New Listings** - Initialize with default values (inactive, $500 deposit, 1 bed, all days/nights available)
- ✅ **Duplicate Existing Listings** - Copy all properties from existing listings (only visible when logged in)
- ✅ **Authentication-Aware** - "Copy Existing" button hidden for non-logged-in users
- ✅ **Profile Completeness Tracking** - Marks first listing creation
- ✅ **Validation** - Requires listing name before submission
- ✅ **Dual View Modes** - Toggle between "Create New" and "Copy Existing"
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **All 8 Workflows** - Complete implementation from Bubble

## Usage

```tsx
import { CreateDuplicateListings } from './components/CreateDuplicateListings';
import type { User, Listing } from './components/CreateDuplicateListings';

function MyApp() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [listings, setListings] = useState<Listing[]>([]);

  return (
    <>
      <button onClick={() => setIsModalVisible(true)}>
        Create Listing
      </button>

      <CreateDuplicateListings
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        currentUser={currentUser} // undefined = not logged in
        existingListings={listings}
        onSuccess={(listing) => {
          console.log('Created:', listing);
          setListings([...listings, listing]);
        }}
        onNavigateToListing={(id) => {
          // Navigate to listing detail page
          window.location.href = `/listings/${id}`;
        }}
      />
    </>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Called when modal is closed |
| `currentUser` | `User \| undefined` | No | Current logged-in user. If undefined, "Copy Existing" button is hidden |
| `existingListings` | `Listing[]` | No | Array of existing listings for duplication |
| `onSuccess` | `(listing: Listing) => void` | No | Called after successful creation/duplication |
| `onNavigateToListing` | `(listingId: string) => void` | No | Called to navigate to listing detail page |

## Authentication Behavior

### Logged In (currentUser provided)
- ✅ Shows "Create New" button
- ✅ Shows "Copy Existing" button (if listings exist)
- ✅ Tracks profile completeness
- ✅ Associates listing with user account

### Logged Out (currentUser = undefined)
- ✅ Shows "Create New" button only
- ❌ Hides "Copy Existing" button
- ❌ No profile tracking
- ⚠️ Creates listing without user association

## Data Types

### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  fullName: string;
  isUsabilityTester: boolean;
  tasksCompleted: string[];
  accountHostId?: string;
}
```

### Listing
```typescript
interface Listing {
  id: string;
  name: string;
  active: boolean;
  defaultExtensionSetting: boolean;
  damageDeposit: number;
  cleaningCost?: number;
  hostLandlordId: string;
  hostName: string;
  hostEmail: string;
  operatorLastUpdated: Date;
  isForUsability: boolean;
  nightsAvailable: string[];
  daysAvailable: string[];
  qtyBeds: number;
  pricePerNight?: number;
  fourWeekRent?: number;
  createdAt: Date;
  updatedAt: Date;
  duplicatedFrom?: string;
}
```

## Default Values

When creating a new listing, these defaults are applied:

- `active`: `false`
- `defaultExtensionSetting`: `false`
- `damageDeposit`: `500`
- `qtyBeds`: `1`
- `nightsAvailable`: All 7 nights
- `daysAvailable`: All 7 days
- `operatorLastUpdated`: Current timestamp

## API Integration

The component includes mock API functions that should be replaced in production:

```typescript
// Replace these in CreateDuplicateListings.tsx
const createListingAPI = async (listing: Partial<Listing>, userId: string): Promise<Listing> => {
  // Your API call here
  const response = await fetch('/api/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listing),
  });
  return response.json();
};

const updateProfileCompleteness = async (userId: string, task: string): Promise<void> => {
  // Your API call here
  await fetch(`/api/users/${userId}/complete-task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  });
};
```

## Workflows Implemented

1. **Alerts General** - Toast notification system
2. **B: Back is clicked** - Return to create mode
3. **B: Copy is clicked** - Show copy interface
4. **B: Create New is clicked** - Create listing with defaults
5. **B: Duplicate is clicked** - Copy existing listing
6. **D: Listings value changed** - Handle dropdown selection
7. **I: Close Create New Listing is clicked** - Close modal
8. **Update profile completeness** - Track first listing creation

## Styling

The component uses styled-components with the exact design from Bubble:

- **Colors**: `#31133D` (dark purple), `#4B47CE` (purple), `#FFFFFF` (white)
- **Fonts**: Inter (titles), DM Sans (buttons), Lato (inputs)
- **Responsive**: Mobile breakpoint at 700px
- **Animations**: Fade-in overlay, slide-in modal

## Testing

Try the component with the demo page:

```bash
npm run dev
```

Open http://localhost:5175 and:
1. Toggle login status to see authentication behavior
2. Create new listings
3. Duplicate existing listings (when logged in)
4. Test validation by submitting empty forms

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT
