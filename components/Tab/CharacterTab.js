import React from 'react';
import {} from 'react-native';
import {StatTab} from './Character/StatTab';
import {TalentTab} from './Character/TalentTab';
import {ConstellationTab} from './Character/ConstellationTab';

export const CharacterTab = props => {
  if (props.tabname === 'Stats') {
    return <StatTab {...props} />;
  } else if (props.tabname === 'Talents') {
    return <TalentTab {...props} />;
  } else if (props.tabname === 'Constellations') {
    return <ConstellationTab {...props} />;
  }
};
