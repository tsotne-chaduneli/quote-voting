import { useRef } from 'react';
import { TextFields } from '../types/quotes';
import safeText from '../utilities/helpers';

interface AddQuoteFormProps{
    processData: (
        { quote, author }: TextFields
    ) => void;
}

export function AddQuoteForm({ processData }: AddQuoteFormProps) {
    const quoteRef = useRef<HTMLTextAreaElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    
    return (
        <form
            className="add-Quote p-4 my-5 flex flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                const quote = quoteRef.current?.value.trim() || '';
                const author = authorRef.current?.value.trim() || '';
                
                if(quote && author){
                    const safeQuote = safeText(quote);
                    const safeAuthor = safeText(author);
                    processData({ quote: safeQuote, author: safeAuthor });
                    if(quoteRef.current) quoteRef.current.value = '';
                    if(authorRef.current) authorRef.current.value = '';
                }
            }}
        >
            <textarea
                placeholder="Quote"
                className="border rounded-sm py-2 px-3 grow"
                ref={quoteRef}
                ></textarea>
            <input 
                type="text"
                placeholder="Author"
                className="border rounded-sm py-2 my-3 px-3 grow"
                ref={authorRef}
            />
            <button
                type="submit"
                className="my-3 border rounded-sm self-center px-5 py-1 cursor-pointer"
            >
                Add
            </button>
        </form>
    );
}
