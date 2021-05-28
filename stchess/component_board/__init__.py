import os
import streamlit.components.v1 as components

from ..config import DEFAULT_FEN

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = False

# Declare a Streamlit component. `declare_component` returns a function
# that is used to create instances of the component. We're naming this
# function "_component_func", with an underscore prefix, because we don't want
# to expose it directly to users. Instead, we will create a custom wrapper
# function, below, that will serve as our component's public API.

# It's worth noting that this call to `declare_component` is the
# *only thing* you need to do to create the binding between Streamlit and
# your component frontend. Everything else we do in this file is simply a
# best practice.

if not _RELEASE:
    _component_func = components.declare_component(
        # We give the component a simple, descriptive name ("my_component"
        # does not fit this bill, so please choose something better for your
        # own component :)
        "board",
        # Pass `url` here to tell Streamlit that the component will be served
        # by the local dev server that you run via `npm run start`.
        # (This is useful while your component is in development.)
        url="http://localhost:3001",
    )
else:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("board", path=build_dir)


# Create a wrapper function for the component. This is an optional
# best practice - we could simply expose the component function returned by
# `declare_component` and call it done. The wrapper allows us to customize
# our component's API: we can pre-process its input args, post-process its
# output value, and add a docstring for users.
def board(color,white=None,black = None,key=None):
    """Create a new instance of "my_component".
    """
    # Call through to our private component function. Arguments we pass here
    # will be sent to the frontend, where they'll be available in an "args"
    # dictionary.
    #
    # "default" is a special argument that specifies the initial return
    # value of the component before the user has interacted with it.

    component_value = _component_func(
        color=color,
        white = white,
        black = black,
        key=key, 
        default={"fen":DEFAULT_FEN}
    )

    # if new_fen is not None:
    #     component_value = {"fen":new_fen}

    # print("Component   fen",fen,component_value)

    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    return component_value


# # Add some test code to play with the component while it's in development.
# # During development, we can run this just as we would any other Streamlit
# # app: `$ streamlit run my_component/__init__.py`
# if not _RELEASE:
#     import streamlit as st

#     st.sidebar.header("Chess on streamlit 🔥")
#     color = st.sidebar.selectbox("Color",["white","black"])
#     fen = st.sidebar.text_input("fen","")


#     # Create an instance of our component with a constant `name` arg, and
#     # print its output value.
#     chess_update = board(color,fen,key = "foo")
#     st.write(chess_update)

#     # st.markdown("---")
#     # st.subheader("Component with variable args")

#     # # Create a second instance of our component whose `name` arg will vary
#     # # based on a text_input widget.
#     # #
#     # # We use the special "key" argument to assign a fixed identity to this
#     # # component instance. By default, when a component's arguments change,
#     # # it is considered a new instance and will be re-mounted on the frontend
#     # # and lose its current state. In this case, we want to vary the component's
#     # # "name" argument without having it get recreated.
#     # name_input = st.text_input("Enter a name", value="Streamlit")
#     # num_clicks = my_component(name_input, key="foo")
#     # st.markdown("You've clicked %s times!" % int(num_clicks))
