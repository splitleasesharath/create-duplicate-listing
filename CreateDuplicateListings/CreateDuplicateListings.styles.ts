import styled from 'styled-components';

export const ModalOverlay = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${props => props.isVisible ? 'fadeIn' : 'fadeOut'} 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

export const ModalContainer = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #6B6B6B;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const HeaderSection = styled.div`
  width: 100%;
  border-bottom: 1px solid #000000;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 2px;
    background-color: #000000;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const HeaderIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Title = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
  color: #000000;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #666666;
  margin: 0;
`;

export const InputSection = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

export const Input = styled.input`
  width: 100%;
  height: 34px;
  padding: 8px 12px;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  color: #3D3D3D;
  background: #FFFFFF;
  border: 1px solid #4B47CE;
  border-radius: 4px;
  transition: all 0.2s ease;

  &::placeholder {
    color: #B5B5B5;
  }

  &:focus {
    outline: none;
    border-color: #4B47CE;
    box-shadow: 0 0 0 2px rgba(75, 71, 206, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const HelperText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #999999;
  margin: 0;
`;

export const DropdownSection = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Select = styled.select`
  width: 100%;
  height: 34px;
  padding: 8px 12px;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  color: #3D3D3D;
  background: #FFFFFF;
  border: 1px solid #4B47CE;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4B47CE;
    box-shadow: 0 0 0 2px rgba(75, 71, 206, 0.2);
  }
`;

export const ButtonSection = styled.div`
  width: 100%;
  height: 54px;
  background-color: #F7F8F9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  min-width: 128px;
  height: 32px;
  padding: 0 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.25px;
  color: #FCFAFF;
  background-color: #31133D;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #3d1a4a;
    box-shadow: 0 2px 8px rgba(49, 19, 61, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    font-size: 13px;
    min-width: 110px;
  }
`;

export const BackButton = styled.button`
  padding: 8px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #31133D;
  background: transparent;
  border: 1px solid #31133D;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;
