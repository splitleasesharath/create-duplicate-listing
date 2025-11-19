import React, { useState } from 'react';
import { CreateDuplicateListings } from './CreateDuplicateListings';
import { User, Listing } from './types';
import styled from 'styled-components';

const ExampleContainer = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

const Subtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  margin: 0;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: #31133D;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const DemoButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background-color: #31133D;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3d1a4a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(49, 19, 61, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const ListingCard = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
`;

const ListingName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #31133D;
`;

const ListingDetail = styled.p`
  font-size: 14px;
  color: #666;
  margin: 4px 0;
`;

const Badge = styled.span<{ active: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.active ? '#4CAF50' : '#999'};
  color: white;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

const InfoBox = styled.div`
  background: #f0f7ff;
  border-left: 4px solid #4B47CE;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 4px;
`;

const InfoText = styled.p`
  margin: 0;
  color: #31133D;
  font-size: 14px;
  line-height: 1.6;
`;

/**
 * Example component demonstrating the CreateDuplicateListings functionality
 * This showcases the converted Bubble.io reusable element in action
 */
export const CreateDuplicateListingsExample: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Toggle to test logged-in/out states
  const [listings, setListings] = useState<Listing[]>([
    {
      id: 'listing-1',
      name: 'Cozy Downtown Apartment',
      active: true,
      defaultExtensionSetting: false,
      damageDeposit: 500,
      cleaningCost: 75,
      hostLandlordId: 'host-1',
      hostName: 'John Doe',
      hostEmail: 'john@example.com',
      operatorLastUpdated: new Date(),
      isForUsability: false,
      nightsAvailable: ['monday-night', 'tuesday-night', 'wednesday-night'],
      daysAvailable: ['monday', 'tuesday', 'wednesday'],
      qtyBeds: 2,
      pricePerNight: 85,
      fourWeekRent: 2380,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'listing-2',
      name: 'Spacious Studio Near Campus',
      active: true,
      defaultExtensionSetting: false,
      damageDeposit: 500,
      hostLandlordId: 'host-1',
      hostName: 'John Doe',
      hostEmail: 'john@example.com',
      operatorLastUpdated: new Date(),
      isForUsability: false,
      nightsAvailable: ['friday-night', 'saturday-night', 'sunday-night'],
      daysAvailable: ['friday', 'saturday', 'sunday'],
      qtyBeds: 1,
      pricePerNight: 65,
      fourWeekRent: 1820,
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-02-20'),
    },
  ]);

  // Mock current user (undefined when logged out)
  const currentUser: User | undefined = isLoggedIn ? {
    id: 'user-1',
    email: 'john@example.com',
    firstName: 'John',
    fullName: 'John Doe',
    isUsabilityTester: false,
    tasksCompleted: [],
    accountHostId: 'host-1',
  } : undefined;

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSuccess = (listing: Listing) => {
    console.log('Listing created/duplicated:', listing);
    setListings(prev => [...prev, listing]);
  };

  const handleNavigateToListing = (listingId: string) => {
    console.log('Navigate to listing:', listingId);
    // In a real app, this would navigate to the listing detail page
    alert(`Would navigate to listing: ${listingId}`);
  };

  return (
    <ExampleContainer>
      <ContentWrapper>
        <Header>
          <Title>Create Duplicate Listings</Title>
          <Subtitle>Converted from Bubble.io Reusable Element</Subtitle>
        </Header>

        <Card>
          <SectionTitle>Demo Controls</SectionTitle>
          <InfoBox>
            <InfoText>
              <strong>Welcome!</strong> This component allows hosts to create new property listings or duplicate existing ones.
              Click the button below to open the modal. Toggle login status to see how the "Copy Existing" button appears only when logged in.
            </InfoText>
          </InfoBox>
          <InfoBox style={{ background: isLoggedIn ? '#e8f5e9' : '#fff3e0', borderLeft: `4px solid ${isLoggedIn ? '#4CAF50' : '#FF9800'}` }}>
            <InfoText>
              <strong>Current Status:</strong> {isLoggedIn ? '✓ Logged In' : '✗ Logged Out'}
              {isLoggedIn && ' - "Copy Existing" button will be visible'}
              {!isLoggedIn && ' - Only "Create New" button will be visible'}
            </InfoText>
          </InfoBox>
          <ButtonGroup>
            <DemoButton onClick={handleOpenModal}>
              Open Create/Duplicate Modal
            </DemoButton>
            <DemoButton
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              style={{ background: isLoggedIn ? '#FF5722' : '#4CAF50' }}
            >
              {isLoggedIn ? 'Log Out' : 'Log In'}
            </DemoButton>
          </ButtonGroup>
        </Card>

        <Card>
          <SectionTitle>Your Listings ({listings.length})</SectionTitle>
          {listings.length === 0 ? (
            <EmptyState>
              <p>No listings yet. Create your first listing to get started!</p>
            </EmptyState>
          ) : (
            <ListingsGrid>
              {listings.map(listing => (
                <ListingCard key={listing.id}>
                  <ListingName>{listing.name}</ListingName>
                  <ListingDetail>
                    <Badge active={listing.active}>
                      {listing.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </ListingDetail>
                  <ListingDetail>
                    <strong>Beds:</strong> {listing.qtyBeds}
                  </ListingDetail>
                  {listing.pricePerNight && (
                    <ListingDetail>
                      <strong>Price/Night:</strong> ${listing.pricePerNight}
                    </ListingDetail>
                  )}
                  {listing.fourWeekRent && (
                    <ListingDetail>
                      <strong>4 Week Rent:</strong> ${listing.fourWeekRent}
                    </ListingDetail>
                  )}
                  <ListingDetail>
                    <strong>Deposit:</strong> ${listing.damageDeposit}
                  </ListingDetail>
                  {listing.duplicatedFrom && (
                    <ListingDetail style={{ color: '#4B47CE', fontWeight: 500 }}>
                      Duplicated from another listing
                    </ListingDetail>
                  )}
                </ListingCard>
              ))}
            </ListingsGrid>
          )}
        </Card>

        <Card>
          <SectionTitle>Features Implemented</SectionTitle>
          <ul style={{ lineHeight: 2, color: '#333' }}>
            <li><strong>Create New Listing:</strong> Initialize listings with default values (inactive, $500 deposit, 1 bed, all days/nights available)</li>
            <li><strong>Duplicate Existing:</strong> Copy all properties from an existing listing with a new name (only visible when logged in)</li>
            <li><strong>Authentication-Aware:</strong> "Copy Existing" button hidden when user is not logged in</li>
            <li><strong>Profile Completeness:</strong> Tracks when user creates their first listing</li>
            <li><strong>Validation:</strong> Requires listing name before creation</li>
            <li><strong>Modal States:</strong> Toggles between "Create New" and "Copy Existing" modes</li>
            <li><strong>Responsive Design:</strong> Adapts to different screen sizes</li>
            <li><strong>Business Logic:</strong> All 8 workflows from Bubble implementation</li>
          </ul>
        </Card>

        <Card>
          <SectionTitle>Implementation Notes</SectionTitle>
          <InfoText style={{ lineHeight: 1.8 }}>
            This component is a complete conversion of the Bubble.io "create duplicate listings" reusable element.
            It includes all workflows, conditionals, and styling from the original design. The mock API functions
            should be replaced with actual API calls in production. All data types, business rules, and validation
            logic have been preserved from the original specification.
          </InfoText>
        </Card>
      </ContentWrapper>

      {/* The Modal Component */}
      <CreateDuplicateListings
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        currentUser={currentUser}
        existingListings={listings}
        onNavigateToListing={handleNavigateToListing}
      />
    </ExampleContainer>
  );
};
