import SearchBar from "@components/search-bar";
import SearchList from "@components/search-list";

export default function Search() {
    return (
        <div className="flex">
            <main className="flex flex-col gap-[32px] w-full row-start-2 items-center sm:items-start">
                <SearchBar />
                <SearchList />
            </main>
        </div>
    );
}
