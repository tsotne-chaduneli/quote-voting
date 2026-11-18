import { Edit, Save, ThumbsDown, ThumbsUp, Undo, X } from "lucide-react";
import useQuotes from "../utilities/useQuotes";
import { useEffect, useRef, useState } from "react";
import { AddQuoteForm } from "./AddQuoteForm";
import { ToggleButton } from "./theme/ToggleButton";
import { Quote } from "../types/quotes";

export default function QuoteList() {
  const {
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
  } = useQuotes();

  const notificationRef = useRef<HTMLParagraphElement | null>(null);
  const [highlighted, setHighlighted] = useState(false);

  const [editQuoteId, setEditQuoteId] = useState<number | null>(null);
  const [editedQuote, setEditedQuote] = useState("");
  const [editedAuthor, setEditedAuthor] = useState("");

  const startEdit = (item: Quote) => {
    setEditQuoteId(item.id);
    setEditedQuote(item.quote);
    setEditedAuthor(item.quote);
  };

  const cancelEdit = () => {
    setEditQuoteId(null);
    setEditedQuote("");
    setEditedAuthor("");
  };

  const saveEditedQuote = (id: number) => {
    upateQuote(id, editedQuote, editedAuthor);
    cancelEdit();
  };

  useEffect(() => {
    if (message && notificationRef.current) {
      notificationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setHighlighted(true);
      const timeout = setTimeout(() => setHighlighted(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  useEffect(() => {
    document.body.className =
      "bg-white dark:bg-gray-800 text-gray-900 dark:text-white";
  }, []);

  return (
    <>
      {
        /* Message notification */
        message && (
          <p
            className={`text-center mt-6 p-3 font-medium transition-colors duration-1000 ${
              highlighted
                ? "bg-yellow-600 text-amber-50"
                : "bg-transparent text-red-600"
            }`}
            ref={notificationRef}
          >
            {message}
          </p>
        )
      }
      <header>
        <ToggleButton />
      </header>
      <div className="quotes w-2/3 mx-auto">
        <AddQuoteForm processData={addQuote} />
        {selectedQuots &&
          selectedQuots.length > 0 &&
          selectedQuots.map((item) => (
            <div
              className="item dark:bg-gray-800 border border-amber-200 p-3 my-2.5 rounded-md flex"
              key={item.id}
            >
              <div className="data-binder bg-amber-100 flex-1 p-4 rounded-md">
                {editQuoteId === item.id ? (
                  <>
                    <textarea
                      className="w-full border rounded-sm py-2 px-3 grow"
                      value={editedQuote}
                      onChange={(e) => setEditedQuote(e.target.value)}
                    ></textarea>
                    <input
                      type="text"
                      className="w-full border rounded-sm py-2 my-3 px-3 grow"
                      value={editedAuthor}
                      onChange={(e) => setEditedAuthor(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <blockquote className="quote dark:text-slate-700">
                      <p>{item.quote}</p>
                    </blockquote>
                    <p className="author mt-4 bg-slate-300 dark:bg-gray-600 rounded-sm max-w-fit py-1 px-3 my-0.5 text-sm">
                      {item.author}
                    </p>
                    <p className="vote text-sm flex mt-4 select-none">
                      <ThumbsUp
                        size="20"
                        className="text-slate-400 me-2 cursor-pointer"
                        onClick={() => {
                          voteIt(item.id, 1);
                        }}
                      />
                      <ThumbsDown
                        size="20"
                        className="text-slate-400 me-2 cursor-pointer"
                        onClick={() => {
                          voteIt(item.id, -1);
                        }}
                      />
                      {item.vote}
                    </p>
                  </>
                )}
              </div>
              {/* ბოლო .data-binder */}
              <div className="controls flex items-center justify-center w-20 select-none gap-2.5">
                {editQuoteId === item.id ? (
                  <>
                    <div className="relative group">
                      <Save
                        size={20}
                        className="text-green-600 cursor-pointer"
                        onClick={() => saveEditedQuote(item.id)}
                      />
                      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                        Save
                      </span>
                    </div>
                    <div className="relative group">
                      <Undo
                        size={20}
                        className="text-red-500 cursor-pointer"
                        onClick={cancelEdit}
                      />
                      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                        Cancel
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative group">
                      <Edit
                        size="20"
                        className="text-slate-400 cursor-pointer"
                        onClick={() => startEdit(item)}
                      />
                      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                        Edit
                      </span>
                    </div>
                    <div className="relative group">
                      <X
                        size="20"
                        className="text-slate-400 cursor-pointer"
                        onClick={() => {
                          deleteQuote(item.id);
                        }}
                      />
                      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                        Delete
                      </span>
                    </div>
                  </>
                )}
              </div>
              {/* ბოლო .controls */}
            </div>
          ))}
        {/* ბოლო .item */}
        {/* Button: quotes > Show any one of them randomly */}
        <div className="tools py-5 flex gap-4 flex-wrap">
          <button
            className="btn border rounded-sm px-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => getRandomQuote()}
          >
            Random Quote &raquo;
          </button>
          {/* Button: voted quotes > Show only voted quots */}
          <button
            className="btn border rounded-sm px-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => getRandomVotedQuote()}
          >
            Show random voted quot
          </button>
          {/* Button: voted quotes > Show only voted quots */}
          <button
            className="btn border rounded-sm px-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => getVotedQuotes()}
          >
            Show only voted quots
          </button>
          {/* Button: the most-voted quotes > Show all tied top quotes */}
          <button
            className="btn border rounded-sm px-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => getTiedTopQuotes()}
          >
            Show all tied top quotes
          </button>
          {/* Button: the most-voted quotes > Show the first one in the list */}
          <button
            className="btn border rounded-sm px-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => getFirstQuote()}
          >
            Show the first one in the list
          </button>
          <button
            className="btn border rounded-sm px-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => getAllQuotes()}
          >
            Show all of them
          </button>
        </div>
        {/* ბოლო .tools */}
      </div>
      {/* // ბოლო .quotes */}
    </>
  );
}
