/**
 * Type definitions for CreateDuplicateListings component
 * Converted from Bubble.io reusable element
 */

export interface NightOption {
  id: string;
  name: string;
  displayName: string;
  singleLetter: string;
  sortOrder: number;
}

export interface DayOption {
  id: string;
  name: string;
  displayName: string;
  singleLetter: string;
  sortOrder: number;
}

export interface Listing {
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

export interface User {
  id: string;
  email: string;
  firstName: string;
  fullName: string;
  isUsabilityTester: boolean;
  tasksCompleted: string[];
  accountHostId?: string;
}

export interface CreateDuplicateListingsProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess?: (listing: Listing) => void;
  currentUser?: User; // Optional - when not provided, user is not logged in
  existingListings?: Listing[];
  onNavigateToListing?: (listingId: string) => void;
}

export interface AlertParams {
  title: string;
  content?: string;
  type?: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFORMATION';
  time?: number;
}

export type ViewMode = 'create' | 'copy';
