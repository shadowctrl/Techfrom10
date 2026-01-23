import Link from 'next/link';
import { removeAsterisks } from '@/helper/slugFormat';
import dateFormat from '@/helper/dateFormat';
import { ExternalLink, Calendar } from 'lucide-react';

interface ArticleHeaderProps {
	headline: string;
	summary: string;
	published: string;
	source: string;
}

export default function ArticleHeader({
	headline,
	summary,
	published,
	source,
}: ArticleHeaderProps) {
	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			<article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				<div className="p-8 lg:p-12">
					<div className="space-y-6">
						<h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
							{removeAsterisks(headline)}
						</h1>
						<p
							className="text-lg text-gray-600 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: summary }}
						/>
					</div>

					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<Calendar className="w-4 h-4" />
							<time dateTime={published}>{dateFormat(published)}</time>
						</div>

						<Link
							href={source}
							target="_blank"
							rel="noreferrer nofollow noopener"
							className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							<span>Read Full Article</span>
							<ExternalLink className="w-4 h-4" />
						</Link>
					</div>
				</div>
			</article>
		</div>
	);
}
