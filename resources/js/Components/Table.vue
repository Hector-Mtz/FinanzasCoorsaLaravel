<template>
    <div class="mx-auto max-w-7xl">
        <div class="inline-block min-w-full align-middle bg-gray-700 border-r-4 border-gray-600">
            <div class="overflow-hidden overflow-x-auto overflow-y-auto text-white">
                <table class="min-w-full custome-table">
                    <thead class="text-sm">
                        <slot name="thead" />
                    </thead>
                    <tbody class="text-sm text-center ">
                        <slot name="tbody" />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style lang="css">
.custome-table thead tr th {
    padding-left: 0.2rem 0.2rem;
    border: 4px solid #4b5563;
}

.custome-table tbody tr td {
    padding-left: 0.2rem 0.2rem;
    border: 4px solid #4b5563;
}

.custome-table thead tr th:first-child {
    border-left: 0px;
}

.custome-table thead tr th:last-child {
    border-right: 0px;
}

.custome-table tbody tr td:first-child {
    border-left: 0px;
}

.custome-table tbody tr td:last-child {
    border-right: 0px;
}
</style>
