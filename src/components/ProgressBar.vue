<template>
    <div class="flex items-center">
        <!-- Loop through maxStars to display filled or empty stars -->
        <div v-for="index in maxStars" :key="index" class="flex items-center">
            <svg v-if="index <= number" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                viewBox="0 0 24 24" fill="currentColor" class="text-yellow-500">
                <path
                    d="M12 2.248c-.403 0-.758.242-.93.616l-2.618 5.287-5.816.845c-.412.06-.764.33-.91.713-.146.382-.062.811.211 1.101l4.21 4.102-.993 5.785c-.07.411.1.828.427 1.08.328.252.765.286 1.142.086L12 18.556l5.216 2.742c.377.2.814.166 1.142-.086.327-.252.497-.669.427-1.08l-.993-5.785 4.21-4.102c.273-.29.357-.719.211-1.101-.146-.383-.498-.653-.91-.713l-5.816-.845-2.618-5.287C12.758 2.49 12.403 2.248 12 2.248z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                fill="currentColor" class="text-gray-300">
                <path
                    d="M12 2.248c-.403 0-.758.242-.93.616l-2.618 5.287-5.816.845c-.412.06-.764.33-.91.713-.146.382-.062.811.211 1.101l4.21 4.102-.993 5.785c-.07.411.1.828.427 1.08.328.252.765.286 1.142.086L12 18.556l5.216 2.742c.377.2.814.166 1.142-.086.327-.252.497-.669.427-1.08l-.993-5.785 4.21-4.102c.273-.29.357-.719.211-1.101-.146-.383-.498-.653-.91-.713l-5.816-.845-2.618-5.287C12.758 2.49 12.403 2.248 12 2.248z" />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            required: true,
        },
        maxStars: {
            type: Number,
            default: 5, // Default to a maximum of 5 stars
        },
    },
};
</script>

<style scoped>
/* Add optional styling */
</style>
