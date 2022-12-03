import React from 'react';
import { useSelector } from 'react-redux';
import {OnboardingStack} from './OnboardingStack';

export function StackSwitcher() {
  const user = useSelector((state) => state?.user);

  // for drawer navigation
  return user?.userProfile ? null : <OnboardingStack />;
}
