import { useEffect, useState } from 'react';
import initialQuotes from '../data/quotes';

import { Quote, TextFields } from '../types/quotes';

export default function useQuotes(){
    
    const storageKey = 'quotes';
    const [quotes, setQuots] = useState<Quote[]>(initializer());
    const [selectedQuots, setSelectedQuots] = useState<Quote[]>(initializer());
    const voting = setQuots;
    
    const [message, setMessage] = useState<string | null>(null);

    useEffect(()=>{
        localStorage.setItem(storageKey, JSON.stringify(quotes));
    }, [quotes]);

    function initializer():Quote[] {
        try {
            const savedQuotes = localStorage.getItem(storageKey);
            const parsed = savedQuotes ? JSON.parse(savedQuotes) : null;
            return parsed && parsed.length > 0 ? parsed : initialQuotes
        } catch {
            return initialQuotes
        }
    }    

    function voteIt(id:number, voteState:number){
        const voteStateSign = voteState > 0 ? 1 : -1;
        voting(prevQuotes => 
            prevQuotes.map(quote => 
                quote.id === id 
                ? { ...quote, vote: quote.vote + (1 * voteStateSign) } 
                : quote
            )
        )
        setSelectedQuots(prev =>
            prev.map(quote =>
                quote.id === id
                    ? { ...quote, vote: quote.vote + (1 * voteStateSign) }
                    : quote
            )
        )
    }

    function deleteQuote(id:number) {
        const quotesModified = quotes.filter(item => item.id !== id);
        setQuots(quotesModified);
        setSelectedQuots(quotesModified);
    }

    function getRandomQuote(){
        if (!quotes.length) {
            setMessage('There are no quotes yet.');
        }else{
            const quoteRandomIndex = Math.floor(Math.random() * quotes.length);
            setSelectedQuots([
                quotes[quoteRandomIndex]
            ]);
            setMessage(null);
        }
    }

    function getRandomVotedQuote(){
        const votedQuotes = quotes.filter(q => q.vote > 0);
        
        if (!votedQuotes.length) {
            setMessage('There are no voted quotes yet.');
        }else{
            const quoteRandomIndex = Math.floor(Math.random() * votedQuotes.length);
            setSelectedQuots([
                votedQuotes[quoteRandomIndex]
            ]);
            setMessage(null);
        }
    }

    function getVotedQuotes(){
        const votedQuotes = quotes.filter(q => q.vote > 0);
        
        if (!votedQuotes.length) {
            setMessage('There are no voted quotes yet.');
        }else{
            setSelectedQuots([
                ...votedQuotes
            ]);
            setMessage(null);
        }
    }

    function getTiedTopQuotes(){
        
        const votedQuotes = quotes.filter(q => q.vote > 0);
        const maxVote = Math.max(...votedQuotes.map(q => q.vote));
        const tiedTopQuotes = votedQuotes.filter(q => q.vote === maxVote && maxVote > 0);

        if (!votedQuotes.length) {
            setMessage('There are no voted quotes yet.')
        }else if(tiedTopQuotes.length > 1){
            setSelectedQuots([
                ...votedQuotes.filter(q => q.vote === maxVote && maxVote > 0)
            ]);
            setMessage(null);
        }else{
            setMessage('There are no tied top-voted quotes.')
        }
    }

    function getFirstQuote(){
        if (!quotes.length) {
            setMessage('There are no quotes yet.')
        }else{
            setSelectedQuots([
                quotes[0]
            ]);
            setMessage(null);
        }
    }
    function getAllQuotes(){
        if (!quotes.length) {
            setMessage('There are no quotes yet.')
        }else{
            setSelectedQuots([
                ...quotes
            ]);
            setMessage(null);
        }
    }
   
    function nextId(): number {
        return quotes.length ? Math.max(...quotes.map(e => e.id)) + 1 : 1;
    }

    function addQuote({ quote, author }: TextFields){
        const newQuote: Quote = {
            id: nextId(),
            quote,
            author,
            vote: 0,
        }
        setQuots(prevQuotes => {
            return [...prevQuotes, newQuote];
        })
        setSelectedQuots(prevSelectedQuotes => [...prevSelectedQuotes, newQuote]);
    }

    function upateQuote(id: number, quote: string, author: string){
        setQuots(prevQuotes => {
            return prevQuotes.map((item) => item.id === id 
                ? { ...item, quote, author } 
                : item 
            )
        })
        setSelectedQuots(prevSelectedQuotes => {
            return prevSelectedQuotes.map((item) => item.id === id 
                ? { ...item, quote, author } 
                : item 
            )
        });
    }

    return {
        selectedQuots,
        message,
        voteIt,
        getRandomQuote,
        getRandomVotedQuote,
        getVotedQuotes,
        getTiedTopQuotes,
        getFirstQuote,
        getAllQuotes,
        addQuote,
        deleteQuote,
        upateQuote,
    };
}