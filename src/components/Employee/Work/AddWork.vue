<template>
    	<div class="px-4 py-6 sm:grid grid-cols-2 gap-x-6 max-w-4xl mx-auto">
		<div class="mb-8">
			<h2 class="text-center text-2xl font-bold text-blue-800">Add Work</h2>
			<div class="mt-6">
				<div class="flex-col space-y-4">
					<input type="text" placeholder="ชื่องาน" class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none" />
					<input type="text" placeholder="Name" class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none" />
					<input type="text" placeholder="Name" class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none" />
      </div>
					<div class="mt-4">
						<p class="mb-1 text-gray-700 font-semibold text-sm">Contact Type</p>
						<div class="flex space-x-4 my-2 items-center">
							<div class="flex items-center space-x-1">
								<input type="radio" id="personal" class="cursor-pointer">
								<label for="personal" class="cursor-pointer">Personal</label>
							</div>
							<div class="flex items-center space-x-1">
								<input type="radio" id="professional" class="cursor-pointer">
								<label for="professional" class="cursor-pointer">Professional</label>
							</div>
						</div>
					</div>
      <button class="w-full mt-4 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white py-2 rounded-md text-lg font-semibold">Add Work</button>
				</div>
			</div>

  <div class=" space-y-4">
    			<div class=" p-6 rounded-md bg-indigo-50">
				<div class="flex justify-between mb-2 items-center">
					<p class="text-lg font-semibold items-center">Jill Johson</p>
					<p class="bg-indigo-500 text-indigo-50 px-3 py-1 rounded-md text-sm">Personal</p>
				</div>
				<div>
					<div class="flex items-center space-x-2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
						</svg>
						<p class="text-md font-semibold">jill@gmail.com</p>
					</div>
					<div class="flex mt-3 text-sm">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
						</svg>
						<p class="text-md mb-6">111-111-111</p>
					</div>
					<div class="space-x-1">
						<span class="text-md px-6 py-2 rounded-md bg-green-500 text-indigo-50 font-semibold cursor-pointer" text-indigo-50 font-semibold cursor-pointer>Edit</span>
						<span class="text-md px-6 py-2 rounded-md bg-red-500 text-indigo-50 font-semibold cursor-pointer">Delete</span>
					</div>
				</div>
			</div>
    			<div class=" p-4 rounded-md bg-indigo-50">
				<div class="flex justify-between mb-2 items-center">
					<p class="text-lg font-semibold items-center">Jill Johson</p>
					<p class="bg-indigo-500 text-indigo-50 px-3 py-1 rounded-md text-sm">Personal</p>
				</div>
				<div>
					<div class="flex items-center space-x-2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
						</svg>
						<p class="text-md font-semibold">jill@gmail.com</p>
					</div>
					<div class="flex mt-3 text-sm">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
						</svg>
						<p class="text-md mb-6">111-111-111</p>
					</div>
					<div class="space-x-1">
						<span class="text-md px-6 py-2 rounded-md bg-green-500 text-indigo-50 font-semibold cursor-pointer" text-indigo-50 font-semibold cursor-pointer>Edit</span>
						<span class="text-md px-6 py-2 rounded-md bg-red-500 text-indigo-50 font-semibold cursor-pointer">Delete</span>
					</div>
				</div>
			</div>
  </div>
		</div>
        
</template>