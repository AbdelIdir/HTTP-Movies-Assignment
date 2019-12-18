import React from "react";

const UpdateMovie = props => {
  return (
    <div>
      Update movie component here
      <form onSubmit={null}>
        <input type="text" placeholder="title" value={null} onChange={null} />
        <input
          type="text"
          placeholder="director"
          value={null}
          onChange={null}
        />
        <input
          type="text"
          placeholder="metascore"
          value={null}
          onChange={null}
        />
        <input type="text" placeholder="actors" value={null} onChange={null} />
        <button> Update this movie's infos</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
