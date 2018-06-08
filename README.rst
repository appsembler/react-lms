Open EdX React LMS app
===========

A project that explores creating an `Open edX <https://open.edx.org/>`_ LMS frontend that's separated from the backend and communicates using API's.

Notice
------
**This is by no means a production-ready app. It's an experiment, a developers playground used to empirically test and create a stable and dev-friendly framework for developing React frontend apps for Open edX.**

Overview
--------
React LMS is an app that plugs into the edx-platform LMS app server. The reason for it being built this way is that at this point we still don't have all the API's necessary to create a fully separate Open edX LMS frontend based on React and running on its own instance, just communicating with the backend via secure API's.

So, we have the Django app and the React frontend app (initially created using ``create-react-app``).

Overall, we use the approach described above in this app because it gives us the following advantages:
* No need to hack the ``edx-platform`` - we extend it and hack in our own app, while still having access to all the core functions and views
* Speaking of hacking - since the idea is to come up with a good way to implement the React LMS frontend, and also map out which API endpoints we're missing (and what the ideal returning data structure is), this approach allows us to use API's that already exist, but also "butcher" certain views to get the data to test our app with
* Our React app simply binds to a hook in the single template our Django app has. It does not get any data from that template and all of its communication to the backend is done via API's. That means that, once the time comes, we can easily use only the React app that is developed, hook it up to the final API's that will be in the core platform by then, and deploy it however we'd like.
* Installation is fairly simple, and frontend development is exactly that - only frontend development. This allows frontend developers with less experience in poking around Open edX core platform to play with this app, and hopefully contribute.
* Because we're running our React app inside of the actual LMS Django app, we can use ``same-origin`` when fetching from existing (and hacked) API's. This, of course, is not good for any kind of production purposes, but it allows rapid development. The API endpoints were meant to be changed at a later point anyway.

Requirements
------------
* Python (2.7)
* Django (1.8)
* Open edX (Ginkgo)

Installation
------------
It is assumed you have an instance of Open edX Gingko running in either a devstack or production style environment.

Installation steps
~~~~~

1. Clone this repo into ``path_to_your_devstack/src/``

2. Shell into your Ginkgo devstack using ``vagrant ssh``

3. Switch to the edxapp user - ``sudo su edxapp``

4. Install the package using: ``pip install -e /edx/src/react-lms/``

5. Add the following to the ``lms.env.json`` file in your devstack::

  "ADDL_INSTALLED_APPS": [
    "react_lms"
  ]

6. Add the following to the LMS URL schema in ``edx-platform/lms/urls.py``::

  urlpatterns += (
          url(r'^react-lms/',
              include('react_lms.urls', namespace='react-lms')),
  )

7. Add the following into your env config file (or the common one) under ``edx-platform/lms/envs/``::

  from react_lms.settings import REACT_LMS

8. There is no eigth step :D You should be good.


Running the app
~~~~~

1. Run the LMS in your devstack (using ``paver``). We like to use the ``--fast`` option with ``paver``, so we don't spend our best years of life waiting for it.

2. Go to ``path_to_your_devstack/src/react-lms/frontend`` in your terminal and run ``yarn start``. Note on this one - make sure you run the ``yarn`` command in the ``/frontend`` folder, not the app root folder.

3. Point your browser to ``localhost:8000/edx-figures``

4. Ta da!


React app overview
------------
The React app code can be found in the ``frontend/`` folder. We use ``yarn`` to manage our packages and start the dev server (using ``yarn start``).

The outline of the code organisation is:

```
frontend
├── config
├── public
├── scripts
├── src
│   ├── lms-base
|   |   ├── components
|   |   ├── config
|   |   ├── redux
|   |   ├── router
|   |   ├── sass-core
|   |   ├── static
|   |   └── views
│   ├── theme
|   |   ├── components
|   |   ├── config
|   |   ├── router
|   |   ├── sass-core
|   |   ├── static
|   |   └── views
│   ├── App.js
│   └── ...
├── README.md
└── ...
```

When developing the app, we add the code into ``lms-base``. What can be seen from the structure above is that the ``theme`` folder also 
