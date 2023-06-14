import { useContext } from 'react';
import { TypeContext, UserContext } from '../contexts/UserContext';

export const useUserContext = () => useContext(UserContext) as TypeContext;
