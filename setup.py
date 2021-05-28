import setuptools

setuptools.setup(
    name="stchess",
    version="0.0.1",
    author="TheoLvs",
    author_email="theo.alves.da.costa@gmail.com",
    description="Chess components for Streamlit",
    long_description="Chess components for Streamlit",
    long_description_content_type="text/plain",
    url="",
    packages=["stchess"],
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.63",
    ],
)
