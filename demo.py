import streamlit as st
from stchess import DEFAULT_FEN
from stchess import board

# Sidebar options
st.sidebar.header("Chess on streamlit 🔥")
color = st.sidebar.selectbox("Color",["white","black"])
white_endpoint = st.sidebar.text_input("White API","")
black_endpoint = st.sidebar.text_input("Black API","")

white_endpoint = None if white_endpoint == "" else white_endpoint
black_endpoint = None if black_endpoint == "" else black_endpoint

values = board(color,white = white_endpoint,black = black_endpoint)
st.write(values)