# monty-hall
Monty Hall simulator developed as test assignment for Tele 2

The app consists if both a frontend (React) and backend Nodejs / Express part.

Both are included in the same branch / deployment here for review purposes.

The app runs a simulator for studying of the Monty Hall door price probability.

For this implementation most time was spent on getting the client / backend communication going,
and a suitable frontend functionality.

The simulation library is derived from a existing nodejs.com public component "montyhall".
I assumed not reinventing wheels would be part of the test so I went for that.
I found a need to extended that component since it was only based on reporting results as a verbal text string.
So I provide a direct access to result data returned in JSON format.
The backend simulator app calls directly into the library methods and returns
the simulation result parameters to the React client.

Client UI is equipped with a graphic background borrowed from the instruction PDF
and UI elements placed on top with CSS controlling placement at absolute coordinates
in harmony with the background picture content..

UI can control number of simulations and if changing of a door is desired.
As developed now no control was added to change number of doors but it remains
a fixed 3 doors as originally in Monty Hall.  The library can simulate with different number of doors.

Node version chosen is v14.18.0 (LTS) and React app generated from that create-react-app template.
Initially I began making the app as function based with useEffect, etc but later went to class based because I
worked quicker in doing some old proven things there. But I could do either way.
Generating class based worked on v14.18.0 by using a template like this:
npx create-react-app my-app --scripts-version react-scripts@2.1.7

Server side is Express setting up a few routes.
One route added for 'API test' so the client can alert in a consistent way
if the backend is down.

Communication front/backend is http queries using
the default fetch API which gave the least of CORS issues.

Limitations, not much formal test code exists, focus was on getting the basics running.
But I would be happy to re-think the design once more and let test reasoning drive writing code.
I will deploy on Amazon E2C as well.
