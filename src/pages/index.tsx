import Image from 'next/image';
import Container from '@/components/Container';
import Logo from '@/components/navbar/Logo';
import Search from '@/components/navbar/Search';
import UserMenu from '@/components/navbar/UserMenu';
import Categories from '@/components/navbar/Categories';
import HeartButton from '@/components/HeartButton';
import { getClasses } from '@/backend/classes/classes.service';
import Classes from '@/backend/classes/classes.model';
import ClassContainer from '@/components/ClassContainer';
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";


const Home = ({ listings }: { listings: string[] }) => {
  const parsedClasses: Classes[] = listings.map((listing) => JSON.parse(listing));
  
  const parsedListings: Classes[] = listings.map((listing) =>
    JSON.parse(listing)
  );
  // const inter = Inter({ subsets: ["latin"] });

  if (!listings) {
    return null; // or handle the case when listings is undefined
  }


  return (
    <main>
      <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <Search />
              <UserMenu currentUser={null} />
            </div>
          </Container>
        </div>
        <Categories />
        <ClassContainer>
          <div
            className="
              pt-12
              pb-64
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
            "      
          >
            {parsedClasses.map((parsedListing) => (
              <div className="col-span-1 cursor-pointer group" key={parsedListing.id} onClick={() => router.push(`/classes/${parsedListing.id}`)}
              >
                <div className="flex flex-col gap-2 w-full">  
                  <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                      fill
                      className="object-cover h-full w-full group-hover:scale-110 transition"
                      src={parsedListing.image}
                      alt="Listing"
                    />
                    <div className="absolute top-3 right-3">
                      <HeartButton
                        listingId={parsedListing.id}
                        currentUser={null}
                      />
                    </div>
                  </div>
                  <div className="font-semibold text-lg text-black">
                    {parsedListing.name}
                  </div>
                  <div className="font-light text-neutral-500">
                    {parsedListing.distance}
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold text-black">
                      ₩{parsedListing.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ClassContainer>
      </div>
    </main>
  );
};

export async function getStaticProps() {
  const classes: Classes[] = await getClasses();
  const listings = classes.map((listing) => JSON.stringify(listing));

  return {
    props: {
      listings,
    },
  };
}

export default Home;
