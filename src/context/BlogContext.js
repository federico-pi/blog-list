import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [...state, 
                { 
                    title: action.payload.title,
                    content: action.payload.content, 
                    id: Math.floor(Math.random() * 99999) // Bad ID practice
                }
            ];
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);
        default: 
            return state;
    }
}

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title, content}})
        callback();
    };
};

const deleteBlogPost = (dispatch) => {
    return id => {
        dispatch({ type: 'delete_blogpost', payload: id })
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost },
    [ 
        {
            title: 'Bill Gates’ Rank On The Forbes 400 Is The Lowest It’s Been In 30 Years', 
            content: 'The Microsoft cofounder’s long streak as the country’s first or second richest has ended—in part due to stock transfers tied to his divorce.', 
            id: 1 
        }, 
        {
            title: 'Teach Yourself To Hack: How This Self-Taught Hacking Team Saved Businesses $27 Billion', 
            content: "There's a widely held belief that the presence of hackers in and around your systems is always a terrible thing. Widely held, but wrong. The presence of cybercriminals is bad, and while cybercrime does often involve hacking, that's far from the whole story. All hackers are not cybercriminals and hacking itself can save your business money. Lots of money. What's more, some of the most successful and legitimate hackers are self-taught.", 
            id: 2 
        }, 
        {
            title: 'Chobani Is Going Public. Its ‘Anti-CEO’ Founder Won’t Be The Only Employee Who Could See A Big Payday', 
            content: 'For most people, big payouts from initial public offerings call to mind software engineers—not yogurt factory workers.', 
            id: 3 
        }
    ]
);