'use client';
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const NoteCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const [copied, setCopied] = useState('');
    const { data: session } = useSession()
    const pathName = usePathname()
    const router = useRouter()
    const handleCopy = () => {
        setCopied(post.text)
        navigator.clipboard.writeText(post.text)
        setTimeout(() => setCopied(""), 3000)
    }
    const handleProfileClick = () => {
        router.push(`/profile?id=${post.user_id}`)
    }

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
                    onClick={handleProfileClick}>
                    <Image
                        src={post.image}
                        alt="user image"
                        height={40}
                        width={40}
                        className="rounded-full object-contain"
                        onClick={() => { handleProfileClick() }}
                    />
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {post.username}</h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post.email}</p>
                    </div>
                </div>
                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post.text ?
                            '/assets/icons/tick.svg' :
                            '/assets/icons/copy.svg'
                        }
                        width={12}
                        height={12}
                    />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">{post.text}</p>
            <p className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}
            </p>
            {session?.user.id === post.user_id && pathName === '/profile' && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-300 pt-3">
                    <p className="font-inter text-sm green_gradient cursor-pointer"
                        onClick={handleEdit}>Edit</p>
                    <p className="font-inter text-sm orange_gradient cursor-pointer"
                        onClick={handleDelete}>Delete</p>
                </div>
            )}
        </div>
    )
}

export default NoteCard