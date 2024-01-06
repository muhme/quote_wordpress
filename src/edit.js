/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

import { useEffect, useState } from '@wordpress/element';
import fetchQuote from './fetchQuote';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
    const [quote, setQuote] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchQuote().then(quote => {
            setQuote(quote);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div {...useBlockProps()}>
            {isLoaded ? (
                <div dangerouslySetInnerHTML={{ __html: quote }} />
            ) : (
                <p>Loading quote...</p>
            )}
        </div>
    );
}
