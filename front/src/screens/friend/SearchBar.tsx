import React from 'react';
import { SearchBarContainer, SearchIcon, SearchInput } from '../../styles/searchbar';
import searchIcon from '../../assets/images/icon/search.png'; 
import { colors } from '../../styles/colors';


type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onClear?: () => void;
    style?: object;
};

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    placeholder = "이메일로 친구 추가",
}) => (
    <SearchBarContainer>
        <SearchIcon source={searchIcon} />
        <SearchInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.gray8}
    />
    </SearchBarContainer>
);

export default SearchBar;
