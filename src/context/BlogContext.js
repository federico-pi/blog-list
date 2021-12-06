import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            })
        default: 
            return state;
    }
}

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({ type: 'get_blogposts', payload: response.data })
    };
};

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title, content });
        if (callback) {
            callback();
        };
    };
};

const deleteBlogPost = dispatch => {
    return async id => {
      await jsonServer.delete(`/blogposts/${id}`);
      dispatch({ type: 'delete_blogpost', payload: id });
    };
  };

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content });
        dispatch({ type: 'edit_blogpost', payload: { id, title, content }});
        if (callback) {
            callback();
        };
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
    // [ 
    //     {
    //         title: 'Bill Gates’ Rank On The Forbes 400 Is The Lowest It’s Been In 30 Years', 
    //         content: 'The Microsoft cofounder’s long streak as the country’s first or second richest has ended—in part due to stock transfers tied to his divorce.', 
    //         id: 1 
    //     }, 
    //     {
    //         title: 'Teach Yourself To Hack: How This Self-Taught Hacking Team Saved Businesses $27 Billion', 
    //         content: "The presence of cybercriminals is bad, and while cybercrime does often involve hacking, that's far from the whole story. All hackers are not cybercriminals and hacking itself can save your business money.", 
    //         id: 2 
    //     }, 
    //     {
    //         title: 'Chobani IPO: Its ‘Anti-CEO’ Founder Won’t Be The Only Employee Who Could See A Big Payday', 
    //         content: 'For most people, big payouts from initial public offerings call to mind software engineers—not yogurt factory workers.', 
    //         id: 3 
    //     }
    // ]
);