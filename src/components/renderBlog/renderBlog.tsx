import { NextPage } from 'next';
import Link from 'next/link';
import { removeAsterisks } from '@/helper/slugFormat';
import dateFormat from '@/helper/dateFormat';
import { NewsItem } from '@/types';
import Image from 'next/image';

interface Props {
	title: string;
	headline: string[];
	summary: string[];
	source: string[];
	time: string[];
	latestNews: NewsItem[];
}

const RenderBlog: NextPage<Props> = ({
	title,
	headline,
	summary,
	source,
	time,
	latestNews,
}) => {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header Section */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							{removeAsterisks(title)}
						</h1>
					</div>
					<p className="text-gray-500 text-sm mt-2">
						📅{' '}
						{new Date().toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</p>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Main Content */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
							{/* Hero Image */}
							<div className="h-64 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-center">
										<div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
											<svg
												className="w-8 h-8 text-white"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
										<h2 className="text-white text-xl font-semibold">
											Tech News Roundup
										</h2>
									</div>
								</div>
							</div>

							{/* News Items */}
							<div className="p-6">
								<div className="space-y-6">
									{headline.map((title, index) => (
										<article key={index} className="group">
											<div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
												<div className="flex-shrink-0">
													<span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
														{index + 1}
													</span>
												</div>

												<div className="flex-1 min-w-0">
													<h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
														{removeAsterisks(title)}
													</h3>

													<p
														className="text-gray-600 text-sm mb-3 leading-relaxed"
														dangerouslySetInnerHTML={{ __html: summary[index] }}
													/>

													<div className="flex items-center justify-between">
														<Link
															href={source[index]}
															target="_blank"
															rel="noreferrer nofollow noopener"
															className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
														>
															Read More
															<svg
																className="ml-1 w-4 h-4"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
																/>
															</svg>
														</Link>

														<span className="text-xs text-gray-500 flex items-center">
															<svg
																className="w-4 h-4 mr-1"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
																/>
															</svg>
															{dateFormat(time[index])}
														</span>
													</div>
												</div>
											</div>
										</article>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Right Sidebar */}
					<div className="lg:col-span-1">
						<div className="sticky top-8 space-y-6">
							{/* Today's News */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									Today's News
								</h2>
								<div className="space-y-4">
									{latestNews.map((item, index) => (
										<div
											key={index}
											className="flex items-start space-x-3 group cursor-pointer"
										>
											<div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
											<p
												className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors leading-relaxed"
												dangerouslySetInnerHTML={{ __html: item.title }}
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RenderBlog;
