import React, { useState, useEffect } from 'react';
import { CreateDuplicateListingsProps, ViewMode, Listing } from './types';
import * as S from './CreateDuplicateListings.styles';

/**
 * CreateDuplicateListings Component
 * Converted from Bubble.io reusable element
 *
 * Allows users to create new listings or duplicate existing ones.
 * Implements all workflows and business logic from the original Bubble element.
 */
export const CreateDuplicateListings: React.FC<CreateDuplicateListingsProps> = ({
  isVisible,
  onClose,
  onSuccess,
  currentUser,
  existingListings = [],
  onNavigateToListing,
}) => {
  // State management
  const [viewMode, setViewMode] = useState<ViewMode>('create');
  const [listingName, setListingName] = useState('');
  const [selectedListingId, setSelectedListingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isVisible) {
      setViewMode('create');
      setListingName('');
      setSelectedListingId('');
    }
  }, [isVisible]);

  // Update listing name when switching to copy mode with a selected listing
  useEffect(() => {
    if (viewMode === 'copy' && selectedListingId) {
      const selectedListing = existingListings.find(l => l.id === selectedListingId);
      if (selectedListing) {
        setListingName(`${selectedListing.name} copy`);
      }
    }
  }, [viewMode, selectedListingId, existingListings]);

  // Check if user is logged in
  const isLoggedIn = !!currentUser;

  // WORKFLOW #4: B: Create New is clicked
  const handleCreateNew = async () => {
    if (!listingName.trim()) {
      showAlert({
        title: 'Validation Error',
        content: 'Please enter a listing title',
        type: 'ERROR',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Create new listing with default values
      const newListing: Partial<Listing> = {
        name: listingName.trim(),
        active: false,
        defaultExtensionSetting: false,
        damageDeposit: 500,
        hostLandlordId: currentUser?.accountHostId || '',
        hostName: currentUser?.fullName || currentUser?.firstName || '',
        hostEmail: currentUser?.email || '',
        operatorLastUpdated: new Date(),
        isForUsability: currentUser?.isUsabilityTester || false,
        nightsAvailable: getAllNightOptions(), // All nights by default
        daysAvailable: getAllDayOptions(), // All days by default
        qtyBeds: 1,
      };

      // Simulate API call - in production, replace with actual API call
      const createdListing = await createListingAPI(newListing, currentUser?.id || '');

      // Step 4: Trigger profile completeness update (only if logged in)
      if (currentUser && !currentUser.tasksCompleted.includes('listing')) {
        await updateProfileCompleteness(currentUser.id, 'listing');
      }

      // Step 5: Hide modal
      onClose();

      // Step 6: Show success alert
      showAlert({
        title: 'Success',
        content: 'Listing created successfully!',
        type: 'SUCCESS',
      });

      // Callback for parent component
      if (onSuccess) {
        onSuccess(createdListing);
      }

      // Step 7: Navigate to listing page
      if (onNavigateToListing) {
        onNavigateToListing(createdListing.id);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      showAlert({
        title: 'Error',
        content: 'Failed to create listing. Please try again.',
        type: 'ERROR',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // WORKFLOW #5: B: Duplicate is clicked
  const handleDuplicate = async () => {
    if (!selectedListingId) {
      showAlert({
        title: 'Validation Error',
        content: 'Please select a listing to duplicate',
        type: 'ERROR',
      });
      return;
    }

    if (!listingName.trim()) {
      showAlert({
        title: 'Validation Error',
        content: 'Please enter a listing title',
        type: 'ERROR',
      });
      return;
    }

    setIsLoading(true);

    try {
      const originalListing = existingListings.find(l => l.id === selectedListingId);
      if (!originalListing) {
        throw new Error('Selected listing not found');
      }

      // Create duplicate with all properties from original
      const duplicateListing: Partial<Listing> = {
        ...originalListing,
        id: undefined as any, // New ID will be generated
        name: listingName.trim(),
        active: false, // Set to inactive by default
        operatorLastUpdated: new Date(),
        createdAt: undefined as any,
        updatedAt: undefined as any,
        duplicatedFrom: originalListing.id,
      };

      const createdListing = await createListingAPI(duplicateListing, currentUser.id);

      // Update profile completeness if needed
      if (!currentUser.tasksCompleted.includes('listing')) {
        await updateProfileCompleteness(currentUser.id, 'listing');
      }

      onClose();

      showAlert({
        title: 'Success',
        content: 'Listing duplicated successfully!',
        type: 'SUCCESS',
      });

      if (onSuccess) {
        onSuccess(createdListing);
      }

      if (onNavigateToListing) {
        onNavigateToListing(createdListing.id);
      }
    } catch (error) {
      console.error('Error duplicating listing:', error);
      showAlert({
        title: 'Error',
        content: 'Failed to duplicate listing. Please try again.',
        type: 'ERROR',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // WORKFLOW #3: B: Copy is clicked
  const handleShowCopyMode = () => {
    setViewMode('copy');
    setListingName('');
    setSelectedListingId('');
  };

  // WORKFLOW #2: B: Back is clicked
  const handleBack = () => {
    setViewMode('create');
    setListingName('');
    setSelectedListingId('');
  };

  // WORKFLOW #7: I: Close Create New Listing is clicked
  const handleClose = () => {
    onClose();
  };

  // Helper function to show alerts (WORKFLOW #1)
  const showAlert = (params: { title: string; content?: string; type?: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFORMATION' }) => {
    // In a production app, integrate with a toast notification library
    // For now, using console and alert
    console.log(`[${params.type || 'INFO'}] ${params.title}`, params.content);
    if (params.type === 'ERROR') {
      alert(`${params.title}\n${params.content || ''}`);
    }
  };

  // Mock API functions - replace with actual API calls in production
  const createListingAPI = async (listing: Partial<Listing>, userId: string): Promise<Listing> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      id: `listing-${Date.now()}`,
      ...listing,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Listing;
  };

  const updateProfileCompleteness = async (userId: string, task: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Updated profile completeness for user ${userId}, task: ${task}`);
  };

  const getAllNightOptions = (): string[] => {
    // Mock implementation - replace with actual API call
    return ['monday-night', 'tuesday-night', 'wednesday-night', 'thursday-night', 'friday-night', 'saturday-night', 'sunday-night'];
  };

  const getAllDayOptions = (): string[] => {
    // Mock implementation - replace with actual API call
    return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  };

  // Determine header icon and title based on view mode
  const headerIcon = viewMode === 'create'
    ? 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"%3E%3Cpath d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"%3E%3C/path%3E%3C/svg%3E'
    : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"%3E%3Crect x="9" y="9" width="13" height="13" rx="2" ry="2"%3E%3C/rect%3E%3Cpath d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"%3E%3C/path%3E%3C/svg%3E';

  const headerTitle = viewMode === 'create' ? 'Create New Listing' : 'Copy Existing Listing';

  return (
    <S.ModalOverlay isVisible={isVisible} onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* Header Section */}
        <S.HeaderSection>
          <S.CloseButton onClick={handleClose} aria-label="Close modal" />
          <S.HeaderTop>
            <S.HeaderIcon src={headerIcon} alt="" />
            <S.Title>{headerTitle}</S.Title>
          </S.HeaderTop>
          <S.Subtitle>
            {viewMode === 'create'
              ? 'Enter the title guests will see when browsing.'
              : 'Select a listing to duplicate and customize the name.'}
          </S.Subtitle>
        </S.HeaderSection>

        {/* Copy Mode: Dropdown to select listing */}
        {viewMode === 'copy' && (
          <S.DropdownSection>
            <S.Label htmlFor="listing-select">Select Listing to Copy</S.Label>
            <S.Select
              id="listing-select"
              value={selectedListingId}
              onChange={(e) => setSelectedListingId(e.target.value)}
            >
              <option value="">-- Select a listing --</option>
              {existingListings.map(listing => (
                <option key={listing.id} value={listing.id}>
                  {listing.name}
                </option>
              ))}
            </S.Select>
          </S.DropdownSection>
        )}

        {/* Input Section */}
        <S.InputSection>
          <S.Label htmlFor="listing-title">Listing Title</S.Label>
          <S.Input
            id="listing-title"
            type="text"
            value={listingName}
            onChange={(e) => setListingName(e.target.value)}
            placeholder="Enter listing title"
            disabled={isLoading}
          />
          <S.HelperText>Don't worry, you can change it later</S.HelperText>
        </S.InputSection>

        {/* Button Section */}
        <S.ButtonSection>
          {viewMode === 'create' ? (
            <>
              {/* Only show Copy Existing button when user is logged in */}
              {isLoggedIn && existingListings.length > 0 && (
                <S.Button onClick={handleShowCopyMode} disabled={isLoading}>
                  Copy Existing
                </S.Button>
              )}
              <S.Button
                onClick={handleCreateNew}
                disabled={!listingName.trim() || isLoading}
              >
                {isLoading ? 'Creating...' : 'Create New'}
              </S.Button>
            </>
          ) : (
            <>
              <S.BackButton onClick={handleBack}>
                Back
              </S.BackButton>
              <S.Button
                onClick={handleDuplicate}
                disabled={!listingName.trim() || !selectedListingId || isLoading}
              >
                {isLoading ? 'Duplicating...' : 'Duplicate'}
              </S.Button>
            </>
          )}
        </S.ButtonSection>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
