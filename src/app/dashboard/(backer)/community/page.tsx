"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Download, ExternalLink, LoaderCircle, Search, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCommunityUsers } from "./api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CommunityPage() {
    const { data: session } = useSession();
    const token = session?.user?.accessToken;
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

    // Debounced search can be added here if needed.
    // We will just execute search on button click or let the user type and submit.
    const [activeSearch, setActiveSearch] = useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["communityUsers", activeSearch, page],
        queryFn: () => fetchCommunityUsers(token as string, activeSearch, page),
        enabled: !!token,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setActiveSearch(searchTerm);
        setPage(1); // reset to first page on search
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Backer Community</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Connect and collaborate with active backers and industry professionals.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="flex relative items-center max-w-sm w-full">
                    <Input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-10 border-gray-300"
                    />
                    <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 h-full px-3 text-gray-400 hover:text-gray-600"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </form>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <LoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
                </div>
            ) : isError ? (
                <div className="text-center text-red-500 py-10">
                    Failed to load community users. Please try again.
                </div>
            ) : data?.users?.length === 0 ? (
                <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
                    No users found in the community.
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {data?.users.map((user) => (
                            <Card key={user._id} className="group relative flex flex-col overflow-hidden rounded-[20px] border-none bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#0052FF] to-[#33BAFF] opacity-0 transition-opacity group-hover:opacity-100" />

                                <CardContent className="flex flex-1 flex-col items-center p-8">
                                    <div className="relative mb-6 h-[100px] w-[100px] shrink-0">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0052FF] to-[#33BAFF] opacity-10 blur-md group-hover:opacity-20 transition-opacity" />
                                        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white shadow-sm">
                                            <Image
                                                src={user.profileImage || "/assets/images/autoLogo.png"}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-[#1E1E1E] group-hover:text-[#0052FF] transition-colors truncate w-full text-center">
                                        {user.firstName} {user.lastName}
                                    </h3>

                                    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                                        {user.jobRole ? (
                                            <Badge className="bg-[#EBF5FF] text-[#0052FF] hover:bg-[#EBF5FF] border-none font-semibold px-3 py-1">
                                                {user.jobRole}
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 border-none px-3 py-1">
                                                Backer
                                            </Badge>
                                        )}
                                        {user.country && (
                                            <div className="flex items-center gap-1 text-xs text-[#909090]">
                                                <MapPin className="h-3 w-3" />
                                                <span>{user.country}</span>
                                            </div>
                                        )}
                                    </div>

                                    {user.bio && (
                                        <p className="mt-5 text-sm text-[#5C5C5C] leading-relaxed line-clamp-3 w-full text-center italic">
                                            &quot;{user.bio}&quot;
                                        </p>
                                    )}
                                </CardContent>

                                <CardFooter className="grid grid-cols-2 gap-3 border-t border-[#F0F0F0] bg-[#FAFAFA]/50 p-5">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-10 rounded-full border-[#E5E7EB] bg-white text-xs font-bold hover:bg-[#F4F4F4] group-hover:border-[#0052FF] transition-colors"
                                        disabled={!user.imdbLink}
                                        asChild={!!user.imdbLink}
                                    >
                                        {user.imdbLink ? (
                                            <Link href={user.imdbLink} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="mr-2 h-3 w-3" />
                                                IMDb
                                            </Link>
                                        ) : (
                                            <span className="text-gray-400">No IMDb</span>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-10 rounded-full border-[#E5E7EB] bg-white text-xs font-bold hover:bg-[#F4F4F4] group-hover:border-[#0052FF] transition-colors"
                                        disabled={!user.cv}
                                        asChild={!!user.cv}
                                    >
                                        {user.cv ? (
                                            <Link href={user.cv} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-3 w-3" />
                                                CV File
                                            </Link>
                                        ) : (
                                            <span className="text-gray-400">No CV</span>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Simple Pagination */}
                    {data?.paginationInfo && data.paginationInfo.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 pt-6">
                            <Button
                                variant="outline"
                                disabled={!data.paginationInfo.hasPreviousPage}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                            >
                                Previous
                            </Button>
                            <span className="text-sm font-medium text-gray-600">
                                Page {data.paginationInfo.currentPage} of {data.paginationInfo.totalPages}
                            </span>
                            <Button
                                variant="outline"
                                disabled={!data.paginationInfo.hasNextPage}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
