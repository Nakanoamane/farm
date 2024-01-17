'use client';

import { RecoilRoot } from 'recoil';
import Home from './_components/home';
import Fields from './_components/fields';
import Shops from './_components/shops';

export default function Page() {
  return (
      <RecoilRoot>
        <main>
          <Home/>

          <Fields/>

          <Shops/>
        </main>
      </RecoilRoot>
  )
}
