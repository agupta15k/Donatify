from setuptools import find_packages, setup, Command

# Package meta-data.
NAME = 'NCSU_SE_FALL22_22_pr_1'
DESCRIPTION = 'This is a project for SE Fall \'22 group 22'
URL = ''
EMAIL = 'dummy@dummy.com'
AUTHOR = 'Group 22'
VERSION = '0.1'
REQUIRES_PYTHON = '>=3'

# required packages for this project to be execute appropriately
REQUIRED = [
    'pytest'
]

# optional packages for this project
EXTRAS = {
}

setup(
    name=NAME,
    version=VERSION,
    description=DESCRIPTION,
    long_description='',
    long_description_content_type='text/markdown',
    author=AUTHOR,
    author_email=EMAIL,
    python_requires=REQUIRES_PYTHON,
    url=URL,
    packages=find_packages(
        exclude=["tests", "*.tests", "*.tests.*", "tests.*"]),
    install_requires=REQUIRED,
    extras_require=EXTRAS,
    include_package_data=True,
    license='',
    classifiers=[
        # 'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: Implementation :: PyPy'
    ],
    # $ setup.py publish support.
    # cmdclass={
    #     'upload': '',
    # },
)
