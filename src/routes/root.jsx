import { Outlet, Link, useLoaderData, Form, redirect} from "react-router-dom";
import { getContacts, createContact } from "../contacts";


export async function loader(){
    const contacts = await getContacts();
    return { contacts }
};

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}`);
  }

export default function Root() {
    const { contacts } = useLoaderData();
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            { contacts.length ? (
                <ul>
                    {
                        contacts.map((item) =>{
                            return(
                                <li key={item.id}>
                                    <Link to={`/contacts/${item.id}`}>
                                        {item.first || item.last ? (
                                            <>
                                            {item.first} {item.last}
                                            </>
                                            ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {item.favorite && <span>★</span>}
                                    </Link>
                                </li>
                            )
                        })
                    }
                 
                </ul>
            )
            :
            (
                <p>
                  <i>No contacts</i>
                </p>
              )
            }
          </nav>
        </div>
        <div id="detail">
            <Outlet></Outlet>
        </div>
      </>
    );
  }