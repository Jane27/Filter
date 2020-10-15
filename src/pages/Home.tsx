import React, { Component, Fragment } from "react";
// import Hero from "../components/Hero";
import authConfig from "../auth_config.json";
import { Auth0ContextInterface, withAuth0 } from "@auth0/auth0-react";
import { Alert } from "reactstrap";
import FilterItem from "../components/FilterItem";
import FilterMenu from "../components/FilterMenu";
import { SortableContainer } from "../components/sortable/SortableContainer";
import SortableItem from "../components/sortable/SortableItem";
import arrayMove from "array-move";

interface HomeProps {
  auth0: Auth0ContextInterface;
}

interface filterItem {
  name: string;
  type: string;
}

class Home extends Component<HomeProps> {
  state = {
    synopsis: [],
    error: "",
    loading: false,
    filterItems: [],
  };

  componentDidMount() {
    const { isAuthenticated } = this.props.auth0;
    if (isAuthenticated) {
      this.getCurrentUserData();
    }
  }

  async getCurrentUserData() {
    this.setState({ loading: true, error: "" });

    const url = `${authConfig.apiBase}/synopsis`;
    const getAccessTokenSilently = await this.props.auth0.getAccessTokenSilently();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessTokenSilently}`,
      },
    });

    if (!response.ok) {
      const error = `An error has occured: ${response.status}`;
      this.setState({ error });
      return;
    }

    const { data } = await response.json();

    this.setState({ synopsis: data?.columns, loading: false });
  }

  addFilter = (item: string) => {
    const newFilterItems = [
      ...this.state.filterItems,
      { name: item, type: "default" },
    ];
    this.setState({ filterItems: newFilterItems });
  };

  deleteFilter = (filterName: string) => {
    let temFilterItem = this.state.filterItems.filter(
      (item: filterItem) => item.name !== filterName
    );
    this.setState({ filterItems: temFilterItem });
  };

  updateInfo = (filterName: string, col: "name" | "type", newValue: string) => {
    console.log(`temFilterItem`, newValue);

    this.state.filterItems.forEach((item: filterItem) => {
      if (item.name === filterName) item[col] = newValue;
    });
    this.setState({ ...this.state.filterItems });
  };
  onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    debugger;
    this.setState(({ filterItems }: { filterItems: filterItem[] }) => {
      return {
        filterItems: arrayMove(filterItems, oldIndex, newIndex),
      };
    });
  };
  render() {
    const { synopsis, error, loading } = this.state;
    const { isAuthenticated } = this.props.auth0;

    return (
      <Fragment>
        {isAuthenticated ? (
          <>
            {loading && <p className="text-center">Loading...</p>}
            {error && <Alert color="danger">{error}</Alert>}
            {synopsis && !loading && (
              <div className="text-center">
                <div className="d-flex p-2 bd-highlight flex-column">
                  Filter
                </div>
                <SortableContainer onSortEnd={this.onSortEnd.bind(this)}>
                  {this.state.filterItems.map((item: filterItem, index) => {
                    return (
                      <SortableItem
                        key={`index-${item.name}`}
                        index={index}
                        value={
                          <FilterItem
                            filterName={item.name}
                            type={item.type}
                            deleteFilter={this.deleteFilter}
                            updateInfo={this.updateInfo}
                          />
                        }
                      />
                    );
                  })}
                </SortableContainer>
                <FilterMenu synopsis={synopsis} addFilter={this.addFilter} />
              </div>
            )}
          </>
        ) : (
          <p className="text-center">Please login first</p>
        )}
      </Fragment>
    );
  }
}

export default withAuth0(Home);
