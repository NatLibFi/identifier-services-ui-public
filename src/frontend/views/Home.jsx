/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file.
 *
 * Public UI service of Identifier Services system
 *
 * Copyright (C) 2023 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of identifier-services-ui-public
 *
 * identifier-services-ui-public program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * identifier-services-ui-public is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 */

import React from 'react';

import useDocumentTitle from '/src/frontend/hooks/useDocumentTitle';

import Banner from '/src/frontend/components/main/Banner.jsx';
import MainInstructions from '/src/frontend/components/main/MainInstructions.jsx';
import IsbnInfoBox from '/src/frontend/components/main/IsbnInfoBox.jsx';
import IssnInfoBox from '/src/frontend/components/main/IssnInfoBox.jsx';

function Home () {
  // Set the title of the current page
  useDocumentTitle('menu.home');

  return (
    <div>
      <Banner />
      <MainInstructions />
      <IsbnInfoBox />
      <IssnInfoBox />
    </div>
  );
}

export default Home;
