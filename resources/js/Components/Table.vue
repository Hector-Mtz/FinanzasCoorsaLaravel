<template>
    <div class="">
        <div class="inline-block min-w-full align-middle bg-white">
            <div class="overflow-hidden overflow-x-auto overflow-y-auto text-black">
                <table class="min-w-full divide-y table-fixed divide-aqua-500 custome-table">
                    <thead class="text-sm">
                        <slot name="thead" />
                    </thead>
                    <tbody class="overflow-x-auto text-sm text-center">
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
    cursor: pointer;
}

.custome-table tbody tr td {
    padding-left: 0.2rem 0.2rem;
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
