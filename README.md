# Create Duplicate Listings - Reusable Component

A React TypeScript component converted from Bubble.io that allows users to create new property listings or duplicate existing ones.

## 🚀 Features

- ✅ **Create New Listings** - Initialize with default values (inactive, $500 deposit, 1 bed, all days/nights available)
- ✅ **Duplicate Existing Listings** - Copy all properties from existing listings
- ✅ **Authentication-Aware** - "Copy Existing" button only visible when user is logged in
- ✅ **Profile Completeness Tracking** - Marks first listing creation
- ✅ **Form Validation** - Requires listing name before submission
- ✅ **Dual View Modes** - Toggle between "Create New" and "Copy Existing"
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Complete Workflows** - All 8 workflows from original Bubble implementation

## 📦 Installation

```bash
npm install
```

## 🎯 Usage

```tsx
import { CreateDuplicateListings } from './CreateDuplicateListings';
import type { User, Listing } from './CreateDuplicateListings';

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
          setListings([...listings, listing]);
        }}
        onNavigateToListing={(id) => {
          window.location.href = `/listings/${id}`;
        }}
      />
    </>
  );
}
```

## 🔑 Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Called when modal is closed |
| `currentUser` | `User \| undefined` | No | Current logged-in user. If undefined, "Copy Existing" is hidden |
| `existingListings` | `Listing[]` | No | Array of existing listings for duplication |
| `onSuccess` | `(listing: Listing) => void` | No | Called after successful creation/duplication |
| `onNavigateToListing` | `(listingId: string) => void` | No | Called to navigate to listing detail page |

## 🔐 Authentication Behavior

### When Logged In (currentUser provided):
- ✅ Shows "Create New" button
- ✅ Shows "Copy Existing" button (if listings exist)
- ✅ Tracks profile completeness
- ✅ Associates listing with user account

### When Logged Out (currentUser = undefined):
- ✅ Shows "Create New" button only
- ❌ Hides "Copy Existing" button
- ❌ No profile tracking
- ⚠️ Creates listing without user association

## 🎨 Design Specifications

Converted from Bubble.io with exact styling:

- **Colors**: `#31133D` (dark purple), `#4B47CE` (purple), `#FFFFFF` (white), `#F7F8F9` (light gray)
- **Typography**:
  - Inter (headings/titles)
  - DM Sans (buttons)
  - Lato (input fields)
- **Responsive**: Mobile breakpoint at 700px
- **Animations**: Fade-in overlay, slide-in modal

## 📚 Documentation

See `CreateDuplicateListings/README.md` for detailed component documentation including:
- Complete API reference
- Data type definitions
- Workflow implementations
- Default values
- API integration guide

## 🧪 Testing

Run the demo:

```bash
npm run dev
```

Open http://localhost:5175 and test:
1. Toggle login status to see authentication behavior
2. Create new listings
3. Duplicate existing listings (when logged in)
4. Test form validation

## 📁 Project Structure

```
create-duplicate-listing-repo/
├── CreateDuplicateListings/
│   ├── CreateDuplicateListings.tsx       # Main component
│   ├── CreateDuplicateListings.styles.ts # Styled components
│   ├── types.ts                          # TypeScript definitions
│   ├── Example.tsx                       # Demo page
│   ├── index.ts                          # Exports
│   └── README.md                         # Component docs
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🔄 Workflows Implemented

All 8 workflows from the original Bubble.io element:

1. **Alerts General** - Toast notification system
2. **B: Back is clicked** - Return to create mode from copy mode
3. **B: Copy is clicked** - Show copy/duplicate interface
4. **B: Create New is clicked** - Create listing with default values
5. **B: Duplicate is clicked** - Copy existing listing with all properties
6. **D: Listings value changed** - Handle dropdown selection changes
7. **I: Close Create New Listing is clicked** - Close modal
8. **Update profile completeness** - Track first listing creation

## 📝 Default Values

New listings are created with:

- `active`: `false`
- `defaultExtensionSetting`: `false`
- `damageDeposit`: `500`
- `qtyBeds`: `1`
- `nightsAvailable`: All 7 nights
- `daysAvailable`: All 7 days
- `operatorLastUpdated`: Current timestamp

## 🔧 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "styled-components": "^6.1.13",
  "typescript": "^5.6.3"
}
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📄 License

MIT

## 🤝 Contributing

This component was converted from a Bubble.io reusable element for the Split Lease application.

---

**Built with ❤️ for Split Lease**
