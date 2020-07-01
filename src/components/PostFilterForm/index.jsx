import React from 'react';
import PropTypes from 'prop-types';
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

PostFilterForm.propTypes = {
    onSubmit: PropTypes.func
};

PostFilterForm.defaultProps = {
    onSubmit: null
};

function PostFilterForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);
        if (!onSubmit) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValue = {
                searchTerm: value
            }
            onSubmit(formValue);
        }, 300);
    }

    return (
        <div>
            <input type="text" value={searchTerm}
                onChange={handleSearchTermChange} />
        </div>
    );
}

export default PostFilterForm;